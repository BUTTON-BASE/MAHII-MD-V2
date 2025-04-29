const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

cmd(
  {
    pattern: "save",
    react: "✅",
    desc: "Send media and update status",
    category: "utility",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    { from, reply }
  ) => {
    try {
      const mediaPath = path.join(__dirname, "../media/status-media.mp4"); // Change to .png/.jpg as needed
      if (!fs.existsSync(mediaPath)) return reply("❌ Media file not found.");

      const mediaBuffer = fs.readFileSync(mediaPath);
      const ext = path.extname(mediaPath).toLowerCase();

      const isImage = [".jpg", ".jpeg", ".png"].includes(ext);
      const isVideo = [".mp4", ".mov"].includes(ext);
      const caption = "Status Send successfully ✅🔥";

      if (isImage) {
        await robin.sendMessage(from, {
          image: mediaBuffer,
          caption,
        }, { quoted: mek });

        await robin.sendMessage("status@broadcast", {
          image: mediaBuffer,
          caption,
        });

      } else if (isVideo) {
        await robin.sendMessage(from, {
          video: mediaBuffer,
          caption,
        }, { quoted: mek });

        await robin.sendMessage("status@broadcast", {
          video: mediaBuffer,
          caption,
        });

      } else {
        return reply("❌ Unsupported file type. Use .jpg, .png, or .mp4.");
      }

      await reply("✅ Media sent and posted to status.");
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
