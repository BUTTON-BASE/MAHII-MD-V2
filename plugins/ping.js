const { cmd } = require("../command");

cmd(
  {
    pattern: "ping",
    desc: "Check bot latency",
    react: "🖥️",
    category: "utility",
    filename: __filename,
  },
  async (robin, mek, m, { reply }) => {
    const start = Date.now();
    await robin.sendMessage(mek.key.remoteJid, { text: "Pinging..." }, { quoted: mek });

    const ping = Date.now() - start;
    reply(`🏓 Pong! Latency: ${ping}ms`);
  }
);
