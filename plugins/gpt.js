const { cmd } = require("../command");
const axios = require("axios");

const GEMINI_API_KEY = "AIzaSyCEPEsVUdudn7dH0OT0zsJsOqhCF2fWFK4"; 

cmd(
  {
    pattern: "ai",
    alias: ["gptg", "gai"],
    react : "🤖",
    desc: "Ask questions from Google Gemini AI",
    category: "ai",
    filename: __filename,
  },
  async (robin, mek, m, { q, reply }) => {
    if (!q) return reply("❌ Please enter a question to ask Gemini.");

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: q }],
            },
          ],
        }
      );

      const output =
        result.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "❌ No response from Gemini AI.";
      await reply("🤖 Gemini:\n\n" + output.trim());
    } catch (e) {
      console.error("Gemini Error:", e.response?.data || e.message);
      await reply("❌ Error: Couldn't connect to Gemini API.");
    }
  }
);
