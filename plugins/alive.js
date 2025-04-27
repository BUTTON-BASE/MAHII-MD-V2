// plugins/alive.js
const { cmd } = require("../command");
const config = require("../config");

cmd(
  {
    pattern: "alive",
    react: "🤖",
    desc: "Show bot status",
    category: "main",
    filename: __filename,
    fromMe: false
  },
  async (robin, mek, m, { reply }) => {
    try {
      const from = mek.key.remoteJid;

      // 1) Recording presence
      await robin.sendPresenceUpdate("recording", from);

      // 2) Send the alive image + caption from config
      await robin.sendMessage(
        from,
        {
          image: { url: config.ALIVE_IMG },
          caption: config.ALIVE_MSG
        },
        { quoted: mek }
      );

      // 3) Small delay for a smooth flow
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 4) Send the voice message (hard-coded URL)
      await robin.sendMessage(
        from,
        {
          audio: {
            url: "https://github.com/Mahii-Botz/Mahii-md-LOGO/raw/refs/heads/main/voice/17457674599319816697n25qpew-voicemaker.in-speech.mp3"
          },
          mimetype: "audio/mpeg",
          ptt: true
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("❌ Error in .alive command:", e);
      reply("❌ Error while sending alive message!");
    }
  }
);
