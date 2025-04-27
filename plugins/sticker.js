// plugins/sticker.js
const { cmd } = require("../command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

cmd(
  {
    pattern: "sticker",
    desc: "Convert replied-to image into a sticker",
    category: "convert",
    react: "🔖",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { quoted, reply }) => {
    try {
      // Check if the user replied with an image message
      if (!quoted || !quoted.message || !quoted.message.imageMessage) {
        return reply("❌ Please reply to an image with .sticker to convert it!");
      }

      // Download the image as a buffer
      const stream = await downloadContentFromMessage(quoted.message.imageMessage, "image");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      // Send it back as a sticker
      await robin.sendMessage(mek.key.remoteJid, { sticker: buffer }, { quoted: mek });
      reply("✅ Sticker created successfully!");
    } catch (e) {
      console.error("Error converting image to sticker:", e);
      reply("❌ Failed to convert image to sticker. Please try again.");
    }
  }
);
