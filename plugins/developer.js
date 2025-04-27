module.exports = {
  name: 'developer',
  command: ['.developer'],
  react: "👨‍💻",
  description: 'Show developer info with image and intro text',
  async execute(sock, msg, args) {
    const developerInfo = {
      name: 'MIHIRANGA',
      number: 'wa.me/94715450089',
      github: 'https://github.com/Mahii-Botz',
      note: 'බොට් එක ගැන support එකක් ඕන නම් msg එකක් දාන්න!',
      image: 'https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/WhatsApp%20Image%202024-11-18%20at%2017.52.46.jpeg?raw=true'
    };

    // STEP 1: Intro Message
    await sock.sendMessage(msg.key.remoteJid, {
      text: '👋 *HEY I AM THE DEVELOPER!*',
    }, { quoted: msg });

    // STEP 2: Developer Info with Image
    const caption = `
 *Developer Info*

👤 *Name:* ${developerInfo.name}
📞 *Number:* ${developerInfo.number}
💻 *GitHub:* ${developerInfo.github}
📸 *Instagram:* ${developerInfo.insta}
📝 *Note:* ${developerInfo.note}
    `;

    await sock.sendMessage(msg.key.remoteJid, {
      image: { url: developerInfo.image },
      caption: caption
    });
  }
};
