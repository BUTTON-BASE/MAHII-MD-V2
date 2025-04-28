const { cmd } = require("../command");
const { downloadMediaMessage } = require("../lib/msg.js");

let savedStatuses = {}; // { saverId: { media, uploaderId } }

cmd(
  {
    pattern: "save",
    react: "💾",
    desc: "Save a replied status",
    category: "status",
    filename: __filename,
  },
  async (robin, mek, m, { quoted, sender, reply, from }) => {
    try {
      if (!quoted || !(quoted.imageMessage || quoted.videoMessage)) {
        return reply("Please reply to a status (image/video) you want to save.");
      }

      const media = await downloadMediaMessage(quoted, "savedStatus");
      if (!media) return reply("Failed to download status.");

      const uploader = quoted.sender; // Status දාපු කෙනාගේ ID
      savedStatuses[sender] = { media, uploader };

      reply("✅ Status saved successfully!");
    } catch (e) {
      console.error(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

cmd(
  {
    pattern: "send",
    react: "📤",
    desc: "Send saved status to uploader and sender",
    category: "status",
    filename: __filename,
  },
  async (robin, mek, m, { sender, reply }) => {
    try {
      const saved = savedStatuses[sender];
      if (!saved) return reply("❌ You haven't saved any status yet.");

      const { media, uploader } = saved;
      if (!uploader) return reply("Uploader information missing.");

      const sendMedia = async (jid, caption) => {
        if (media.mimetype.startsWith("image/")) {
          await robin.sendMessage(jid, { image: media, caption });
        } else if (media.mimetype.startsWith("video/")) {
          await robin.sendMessage(jid, { video: media, caption });
        } else {
          throw new Error("Unknown media type.");
        }
      };

      // 1. Send to uploader
      await sendMedia(uploader, "💌 Your status was saved and sent!");
      
      // 2. Send to command user (sender)
      await sendMedia(sender, "💾 Here is the saved status you requested!");

      reply("✅ Status sent to both uploader and you!");
    } catch (e) {
      console.error(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

// Aliases
["ewanna", "danna", "dapan"].forEach((cmdName) => {
  cmd(
    {
      pattern: cmdName,
      react: "🚀",
      desc: `Send saved status to uploader and sender (${cmdName})`,
      category: "status",
      filename: __filename,
    },
    async (robin, mek, m, { sender, reply }) => {
      try {
        const saved = savedStatuses[sender];
        if (!saved) return reply("❌ You haven't saved any status yet.");

        const { media, uploader } = saved;
        if (!uploader) return reply("Uploader information missing.");

        const sendMedia = async (jid, caption) => {
          if (media.mimetype.startsWith("image/")) {
            await robin.sendMessage(jid, { image: media, caption });
          } else if (media.mimetype.startsWith("video/")) {
            await robin.sendMessage(jid, { video: media, caption });
          } else {
            throw new Error("Unknown media type.");
          }
        };

        await sendMedia(uploader, "💌 Your status was saved and sent!");
        await sendMedia(sender, "💾 Here is the saved status you requested!");

        reply("✅ Status sent to both uploader and you!");
      } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
      }
    }
  );
});
