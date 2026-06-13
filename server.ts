import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import crypto from "crypto";
import handleKeepAlive from "./api/keep-alive";
import handleGeminiGenerate from "./api/gemini/generate";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing
app.use(express.json());

// Helper to parse cookies on the server side
const parseCookies = (cookieHeader?: string) => {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const name = parts[0].trim();
    if (name) {
      cookies[name] = parts.slice(1).join("=").trim();
    }
  });
  return cookies;
};

// Server-side robust anonymous ID (UUID v4) generator
function generateUUIDServer(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Middleware for universal tracking cookie injection (anonymous_id)
app.use((req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const anonymousId = cookies["anonymous_id"];

  if (!anonymousId) {
    const newId = generateUUIDServer();
    const host = req.get("host") || "";
    let cookieOptions = `Path=/; Max-Age=${365 * 24 * 60 * 60}; SameSite=Lax;`;
    if (host.includes("hexerapp.ir")) {
      cookieOptions += " Domain=.hexerapp.ir;";
    }
    res.setHeader("Set-Cookie", `anonymous_id=${newId}; ${cookieOptions}`);
  }
  
  next();
});

// REST API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/keep-alive", handleKeepAlive as any);
app.post("/api/gemini/generate", handleGeminiGenerate as any);

async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});
