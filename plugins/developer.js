// plugins/developer.js
const { cmd } = require("../command");

cmd(
  {
    pattern: "developer",
    alias: ["dev", "creator"],
    desc: "Show developer info with image and intro text",
    category: "info",
    react: "👨‍💻",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { reply }) => {
    const developerInfo = {
      name: "MIHIRANGA",
      number: "wa.me/94715450089",
      github: "https://github.com/Mahii-Botz",
      note: "බොට් එක ගැන support එකක් ඕන නම් msg එකක් දාන්න!",
      image:
        "https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/WhatsApp%20Image%202024-11-18%20at%2017.52.46.jpeg?raw=true",
    };

    // STEP 1: Intro reaction (optional)
    await robin.sendMessage(mek.key.remoteJid, {
      react: { text: "👨‍💻", key: mek.key },
    });

    // STEP 2: Intro Message
    await robin.sendMessage(
      mek.key.remoteJid,
      { text: "👋 *HEY I AM THE DEVELOPER!*" },
      { quoted: mek }
    );

    // STEP 3: Developer Info with Image
    const caption = `
*👨‍💻 Developer Info*

👤 *Name:* ${developerInfo.name}
📞 *Contact:* ${developerInfo.number}
💻 *GitHub:* ${developerInfo.github}
📝 *Note:* ${developerInfo.note}
    `.trim();

    await robin.sendMessage(
      mek.key.remoteJid,
      { image: { url: developerInfo.image }, caption },
      { quoted: mek }
    );
  }
);
