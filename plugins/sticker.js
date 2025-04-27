
const { cmd } = require("../command");
const { downloadMediaMessage } = require("../lib/msg");

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
      // Make sure they replied to an image
      if (!quoted || !quoted.imageMessage) {
        return reply("❌ Reply to an image with .sticker to convert it!");
      }

      // Download the image as a buffer
      const buffer = await downloadMediaMessage(quoted, { returnAs: "buffer" });

      // Send it back as a sticker
      await robin.sendMessage(mek.key.remoteJid, { sticker: buffer }, { quoted: mek });
    } catch (e) {
      console.error(e);
      reply("❌ Failed to convert image to sticker.");
    }
  }
);
