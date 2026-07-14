import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for generating STAR story (Premium Feature - Disabled for now)
  /*
  app.post("/api/generate-star", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a professional with 25 years of experience building personal brands. 
Translate the following user input into a professional STAR format (Situation, Task, Action, Result) story. 
Make it sound impressive and suitable for an executive portfolio.
Return the result strictly as a JSON object with these keys: 
"title" (short catchy title, max 5 words), 
"situation" (1-2 sentences), 
"task" (1 sentence), 
"action" (2-3 sentences), 
"result" (1-2 sentences), 
"metrics" (1 short phrase summarizing the impact, e.g., "Increased revenue by 25%").

User input:
${text}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const jsonStr = response.text;
      if (!jsonStr) {
        throw new Error("No response from AI");
      }
      
      const parsed = JSON.parse(jsonStr);
      res.json(parsed);
    } catch (error) {
      console.error("Error generating STAR story:", error);
      res.status(500).json({ error: "Failed to generate STAR story." });
    }
  });
  */

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
