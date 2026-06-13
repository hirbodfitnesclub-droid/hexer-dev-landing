import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Handles the keep-alive ping for Supabase REST endpoints in a Vercel Serverless environment.
 * Requires bearer authorization matching the CRON_SECRET environment variable.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Authorization check using environment variable
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("Keep-alive failed: CRON_SECRET is not configured in the environment.");
    return res.status(500).json({ error: "CRON_SECRET configuration missing" });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    console.warn("Unauthorized attempt to access Vercel keep-alive endpoint");
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Read Supabase environment variables dynamically
  const supabaseUrl = process.env.VITE_ANALYTICS_SUPABASE_URL || 
                      process.env.NEXT_PUBLIC_SUPABASE_URL || 
                      process.env.SUPABASE_URL;
                      
  const supabaseAnonKey = process.env.VITE_ANALYTICS_SUPABASE_ANON_KEY || 
                          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                          process.env.SUPABASE_ANON_KEY || 
                          process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Keep-alive skipped: Supabase environment variables are missing.");
    return res.status(400).json({ 
      success: false, 
      error: "Supabase configuration variables are missing in environment setup." 
    });
  }

  try {
    // 3. Make GET request to the Supabase rest base URL to keep the database awake
    const baseUrl = supabaseUrl.replace(/\/$/, "");
    const targetUrl = `${baseUrl}/rest/v1/`;

    const apiResponse = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`
      }
    });

    if (!apiResponse.ok) {
      const errorDetail = await apiResponse.text();
      console.error(`Supabase Ping failed with status ${apiResponse.status}:`, errorDetail);
      return res.status(502).json({
        success: false,
        error: "Supabase responded with an error or database is paused.",
        status: apiResponse.status,
        details: errorDetail
      });
    }

    // 4. Return success status
    return res.status(200).json({ success: true, timestamp: new Date().toISOString() });
  } catch (err: any) {
    console.error("Keep-alive network error:", err);
    return res.status(500).json({
      success: false,
      error: "An internal error occurred during Supabase keep-alive ping.",
      details: err.message
    });
  }
}
