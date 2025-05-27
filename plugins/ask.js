const { cmd } = require("../command");
const axios = require("axios");

// Replace with your actual Gemini API key from https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = "AIzaSyC3GkZTFDRlYHdfqkWh_MNdU47-jqPndEs";

cmd(
  {
    pattern: "ask",
    alias: ["gemini", "gpt", "ai"],
    react: "🤖",
    desc: "Ask Gemini AI anything",
    category: "ai",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("Please provide a question. Example: .ask What is the capital of France?");

      reply("🤖 Gemini is thinking...");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: q }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!aiReply) return reply("❌ Gemini did not return a valid response.");

      await robin.sendMessage(from, { text: `🤖 *Gemini says:*\n\n${aiReply}` }, { quoted: mek });
    } catch (e) {
      console.error("Gemini API Error:", e.response?.data || e.message);
      reply(`❌ Error: ${e?.response?.data?.error?.message || e.message}`);
    }
  }
);
