const config = require("../config.js");

module.exports = {
  name: "antiDelete",
  type: "event",
  description: "Anti-delete messages (controlled by config.js)",

  async execute(mek, { robin }) {
    if (!config.ANTI_DELETE) return; // 🔒 Check if feature is enabled

    if (!mek || !mek.key || mek.messageStubType !== 1) return;

    try {
      const msg = mek.message;
      const chatId = mek.key.remoteJid;
      const sender = mek.key.participant || chatId;
      const pushname = mek.pushName || "Someone";

      let contentText = `📛 *Anti Delete Triggered*\n👤 ${pushname} deleted a message!\n`;
      const quoted = { key: mek.key, message: msg };

      if (msg?.conversation) {
        contentText += `📝 Message: ${msg.conversation}`;
        await robin.sendMessage(chatId, { text: contentText }, { quoted });
      } else if (msg?.extendedTextMessage?.text) {
        contentText += `📝 Message: ${msg.extendedTextMessage.text}`;
        await robin.sendMessage(chatId, { text: contentText }, { quoted });
      } else if (msg?.imageMessage) {
        contentText += "🖼️ Deleted an image:";
        await robin.sendMessage(chatId, { image: msg.imageMessage, caption: contentText }, { quoted });
      } else if (msg?.videoMessage) {
        contentText += "🎥 Deleted a video:";
        await robin.sendMessage(chatId, { video: msg.videoMessage, caption: contentText }, { quoted });
      } else if (msg?.stickerMessage) {
        contentText += "🔖 Deleted a sticker:";
        await robin.sendMessage(chatId, { sticker: msg.stickerMessage }, { quoted });
      } else {
        contentText += "❓ Deleted a message (type unknown)";
        await robin.sendMessage(chatId, { text: contentText }, { quoted });
      }
    } catch (err) {
      console.error("Anti-Delete Error:", err.message);
    }
  },
};
