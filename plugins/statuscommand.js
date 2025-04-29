const { cmd } = require("../command");

cmd(
  {
    pattern: "send",
    react: "📤",
    desc: "Send latest viewed status",
    category: "utility",
    filename: __filename,
  },
  async (robin, mek, m, { from, reply }) => {
    try {
      const chats = await robin.store?.messages?.get("status@broadcast");

      if (!chats || chats.size === 0) {
        return reply("❌ No statuses found or not yet viewed.");
      }

      // Get the latest status
      const messages = [...chats.values()];
      const lastStatus = messages[messages.length - 1];

      const mimeType = Object.keys(lastStatus.message || {})[0];

      if (mimeType === "imageMessage") {
        const media = await robin.downloadMediaMessage(lastStatus);
        await robin.sendMessage(from, { image: media, caption: "📤 Here's the latest status" }, { quoted: mek });
      } else if (mimeType === "videoMessage") {
        const media = await robin.downloadMediaMessage(lastStatus);
        await robin.sendMessage(from, { video: media, caption: "📤 Here's the latest status" }, { quoted: mek });
      } else if (mimeType === "textMessage" || mimeType === "conversation") {
        const text = lastStatus.message?.conversation || lastStatus.message?.extendedTextMessage?.text;
        await reply(`📝 Latest status text:\n\n${text}`);
      } else {
        return reply("❌ Unsupported status type.");
      }
    } catch (err) {
      console.error(err);
      reply("❌ Failed to fetch status. Make sure the bot has read/viewed at least one.");
    }
  }
);
