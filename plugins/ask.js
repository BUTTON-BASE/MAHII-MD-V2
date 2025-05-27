const { cmd } = require("../command");
const axios = require("axios");

// ⚠️ Replace this with your new regenerated key (don't use the old one you posted)
const DEEPSEEK_API_KEY = "sk-403a5dead23c4912ad1dcc2aaf3a09b4";

cmd(
  {
    pattern: "ask",
    alias: ["deepseek", "ai", "gpt"],
    react: "🤖",
    desc: "Ask DeepSeek AI any question",
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

      reply("🧠 Thinking...");

      const response = await axios.post("https://api.deepseek.com/v1/chat/completions", {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: q,
          },
        ],
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
        },
      });

      const aiResponse = response.data?.choices?.[0]?.message?.content?.trim();
      if (!aiResponse) return reply("❌ No response from DeepSeek AI.");

      await robin.sendMessage(from, { text: `🤖 *DeepSeek AI says:*\n\n${aiResponse}` }, { quoted: mek });

    } catch (e) {
      console.error("DeepSeek API Error:", e);
      reply(`❌ Error: ${e?.response?.data?.error?.message || e.message}`);
    }
  }
);
