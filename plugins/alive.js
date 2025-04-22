const { cmd } = require("../command");
const config = require("../config"); // 

cmd(
  {
    pattern: "alive",
    react: "🤖",
    desc: "Show bot status",
    category: "main",
    filename: __filename,
    fromMe: false
  },
  async (robin, m, msg, extras) => {
    await robin.sendMessage(
      m.key.remoteJid,
      {
        image: { url: config.ALIVE_IMG },
        caption: config.ALIVE_MSG
      },
      { quoted: m }
    );
  }
);
