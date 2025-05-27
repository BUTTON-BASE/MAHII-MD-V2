const { cmd } = require("../command");
const axios = require("axios");

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
      if (!q) return reply("Please provide a question. Example: .ask What is AI?");

      reply("🤖 Gemini is thinking...");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: q }],
              role: "user",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!aiReply) return reply("❌ Gemini didn't return a response.");

      await robin.sendMessage(from, { text: `🤖 *Gemini says:*\n\n${aiReply}` }, { quoted: mek });
    } catch (e) {
      console.error("Gemini API Error:", e);
      reply(`❌ Error: ${e?.response?.data?.error?.message || e.message}`);
    }
  }
);
