const { cmd } = require("../command");
const { readEnv } = require("../lib/database");

cmd(
  {
    pattern: "alive",
    react : "🤖",
    desc: "Show bot status",
    category: "main",
    filename: __filename,
    fromMe: false
  },
  async (robin, m, msg, extras) => {
    const config = await readEnv();
    await robin.sendMessage(m.key.remoteJid, {
      image: { url: config.ALIVE_IMG },
      caption: config.ALIVE_MSG
    }, { quoted: m });
  }
);
