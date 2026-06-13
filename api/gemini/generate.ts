import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize GenAI safely using standard user-agent and optional check
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

/**
 * Vercel Serverless Function to process Persian inputs with Gemini AI and map them into
 * a structured task/note object.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow only POST method for security & protocol correctness
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "متن وارد شده نامعتبر است." });
    }

    if (!ai) {
      console.warn("GEMINI_API_KEY is not defined. Using fallback dummy parser.");
      return res.status(200).json({
        type: "task",
        title: "بررسی تنظیمات هِکسِر",
        description: `شبیه‌ساز هِکسِر: "${text}" \n(لطفاً کلید GEMINI_API_KEY را در بخش تنظیمات > Secrets تنظیم کنید)`,
        priority: "high",
        dueDate: new Date().toISOString().split("T")[0],
        emoji: "⚡",
        tags: ["هِکسِر", "تنظیمات", "دمو"],
        isFallback: true
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: text,
      config: {
        systemInstruction: `You are Hexer AI, a smart Persian productivity assistant. Extract a structured task or note from the Persian text.
If the text describes a concrete action item, task, or to-do with a potential deadline or frequency, make it a "task". If it is just an idea, random thought, details, or general info, make it a "note".
Determine a suitable short Persian title (max 8 words), a clear brief Persian description detailing what was said, the priority (high, medium, or low), and estimate a realistic dueDate in YYYY-MM-DD format (or null if not mentioned or relative and hard to estimate). Choose a single extremely relevant emoji matching the content. Output tags.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: {
              type: Type.STRING,
              description: "Must be 'task' or 'note'"
            },
            title: {
              type: Type.STRING,
              description: "Short Persian title (max 8 words)"
            },
            description: {
              type: Type.STRING,
              description: "Brief Persian description summarizing the user text"
            },
            priority: {
              type: Type.STRING,
              description: "Priority of the task/note: 'high', 'medium', or 'low'"
            },
            dueDate: {
              type: Type.STRING,
              description: "Due date of the task in YYYY-MM-DD or null"
            },
            emoji: {
              type: Type.STRING,
              description: "One relevant emoji"
            },
            tags: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "A list of 1-3 relevant Persian tags"
            }
          },
          required: ["type", "title", "description", "priority", "dueDate", "emoji", "tags"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("پاسخی از مدل هوش مصنوعی دریافت نشد.");
    }

    const jsonResult = JSON.parse(resultText.trim());
    return res.status(200).json(jsonResult);
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "خطایی در پردازش اطلاعات توسط هوش مصنوعی رخ داد.",
      details: error.message
    });
  }
}
