// Gym Buddy server using Groq (FREE AI)

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

if (!process.env.GROQ_API_KEY) {
  console.warn("WARNING: GROQ_API_KEY is not set. /api/ai will fail.");
}

app.use(express.json({ limit: "256kb" }));

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, mode } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    // Optional: tweak tokens based on mode
    const maxTokens =
      mode === "suggestions" ? 700 :
      mode === "builder" ? 700 :
      600;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: String(prompt) }],
      max_tokens: maxTokens
    });

    const reply = completion.choices?.[0]?.message?.content || "";
    res.json({ reply });
  } catch (err) {
    console.error("Groq AI error:", err);
    res.status(500).json({ error: "AI error" });
  }
});

const publicDir = __dirname;
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gym Buddy (Groq) running at http://localhost:${PORT}`);
});
