const { cmd } = require("../command");
const { downloadMediaMessage } = require("../lib/msg.js"); // adjust path

// Simple database to store statuses (in-memory, for now)
let savedStatuses = {};

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

      // Save media in memory using sender ID as key
      savedStatuses[sender] = media;
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
    desc: "Send your saved status",
    category: "status",
    filename: __filename,
  },
  async (robin, mek, m, { sender, reply, from }) => {
    try {
      const media = savedStatuses[sender];
      if (!media) return reply("❌ You haven't saved any status yet.");

      // Detect media type and send appropriately
      if (media.mimetype.startsWith("image/")) {
        await robin.sendMessage(from, { image: media }, { quoted: mek });
      } else if (media.mimetype.startsWith("video/")) {
        await robin.sendMessage(from, { video: media }, { quoted: mek });
      } else {
        reply("Unknown media type.");
      }
    } catch (e) {
      console.error(e);
      reply(`Error: ${e.message || e}`);
    }
  }
);

// Aliases (ewanna, danna, dapan)
["ewanna", "danna", "dapan"].forEach((cmdName) => {
  cmd(
    {
      pattern: cmdName,
      react: "🚀",
      desc: `Send your saved status (${cmdName})`,
      category: "status",
      filename: __filename,
    },
    async (robin, mek, m, { sender, reply, from }) => {
      try {
        const media = savedStatuses[sender];
        if (!media) return reply("❌ You haven't saved any status yet.");

        if (media.mimetype.startsWith("image/")) {
          await robin.sendMessage(from, { image: media }, { quoted: mek });
        } else if (media.mimetype.startsWith("video/")) {
          await robin.sendMessage(from, { video: media }, { quoted: mek });
        } else {
          reply("Unknown media type.");
        }
      } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
      }
    }
  );
});
