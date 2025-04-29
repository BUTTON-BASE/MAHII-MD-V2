const { cmd } = require("../command");

cmd(
  {
    pattern: "send",
    react: "📤",
    desc: "Send all viewed statuses",
    category: "utility",
    filename: __filename,
  },
  async (robin, mek, m, { from, reply }) => {
    try {
      const chats = await robin.store?.messages?.get("status@broadcast");

      if (!chats || chats.size === 0) {
        return reply("❌ No viewed statuses found.");
      }

      const messages = [...chats.values()];

      for (const msg of messages) {
        const mimeType = Object.keys(msg.message || {})[0];

        if (mimeType === "imageMessage") {
          const media = await robin.downloadMediaMessage(msg);
          await robin.sendMessage(from, { image: media, caption: "📤 Status (image)" }, { quoted: mek });
        } else if (mimeType === "videoMessage") {
          const media = await robin.downloadMediaMessage(msg);
          await robin.sendMessage(from, { video: media, caption: "📤 Status (video)" }, { quoted: mek });
        } else if (mimeType === "conversation" || mimeType === "extendedTextMessage") {
          const text =
            msg.message?.conversation || msg.message?.extendedTextMessage?.text;
          if (text) await reply(`📝 Status text:\n\n${text}`);
        } else {
          await reply("⚠️ Skipped unsupported status type.");
        }

        // Wait a little before sending next to avoid flooding
        await new Promise((res) => setTimeout(res, 2000));
      }

      await reply("✅ All viewed statuses sent.");
    } catch (err) {
      console.error(err);
      reply("❌ Error while sending statuses.");
    }
  }
);
