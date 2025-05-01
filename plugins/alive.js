const { cmd } = require("../command");

cmd(
  {
    pattern: "alive",
    react: "🤖",
    desc: "Show bot status",
    category: "main",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { reply }) => {
    try {
      const from = mek.key.remoteJid;

      await robin.sendPresenceUpdate("recording", from);

      // Alive Image & Caption
      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/ChatGPT%20Image%20Apr%2021,%202025,%2005_32_50%20PM.png?raw=true",
          },
          caption: `𝗠𝗔𝗛𝗜𝗜 𝗠𝗗 𝗜𝗦 𝗔𝗟𝗜𝗩𝗘 𝗡𝗢𝗪  
  
𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗰𝗵𝗮𝗻𝗲𝗹 -: https://whatsapp.com/channel/0029VbAhqiN11ulH226HjN0Z

𝗚𝗶𝘁 𝗛𝘂𝗯 𝗥𝗲𝗽𝗼 -: https://github.com/Mahii-Botz/MAHII-MD-V2

𝗢𝘄𝗻𝗲𝗿 -: https://wa.me/94715450089
          
*We are not responsible for any*  
*WhatsApp bans that may occur due to*  
*the usage of this bot. Use it wisely*  
*and at your own risk* ⚠️`,
        },
        { quoted: mek }
      );

      // Delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Voice Message
      await robin.sendMessage(
        from,
        {
          audio: {
            url: "https://github.com/Mahii-Botz/Mahii-md-LOGO/raw/refs/heads/main/voice/17457674599319816697n25qpew-voicemaker.in-speech.mp3",
          },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("❌ Error in .alive command:", e);
      reply("❌ Error while sending alive message!");
    }
          })
