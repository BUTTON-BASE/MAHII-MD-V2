const { cmd } = require("../command"); // Import command handler

let statusStore = {}; // Temporary store for status

// Save the status for the user
cmd(
  {
    pattern: "save",
    alias: ["ewanna", "ewapan", "daanna"], // Aliases for saving status
    desc: "Save a custom status message",
    category: "status",
    react: "💬",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { reply, args }) => {
    const status = args.join(" ");
    if (!status) return reply("❌ Please provide a status message!");

    // Save the status to the bot's memory (can be later saved to a file or DB)
    statusStore[mek.key.remoteJid] = status;
    return reply(`✅ Status saved: "${status}"`);
  }
);

// Send the saved status to the user
cmd(
  {
    pattern: "send",
    alias: ["ewanna", "ewapan", "daanna"], // Aliases for sending status
    desc: "Send saved status as a reply",
    category: "status",
    react: "📲",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { reply }) => {
    const status = statusStore[mek.key.remoteJid];

    if (!status) return reply("❌ No status saved for you! Use .save <your status>");

    await robin.sendMessage(mek.key.remoteJid, { text: status }, { quoted: mek });
    return reply("✅ Status sent successfully!");
  }
);
