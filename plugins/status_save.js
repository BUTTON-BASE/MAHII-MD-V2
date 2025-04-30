const { cmd } = require("../command");

cmd(
  {
    on: "body",
  },
  async (
    robin,
    mek,
    m,
    {
      body,
      reply,
    }
  ) => {
    if (!m.quoted || !body) return;

    const bdy = body.toLowerCase();
    const keywords = [
      "දියම්", "දෙන්න", "දාන්න", "එවන්න", "ඕන", "ඕනා", "එවපන්", "දාපන්", "එව්පන්",
      "send", "give", "ewpn", "ewapan", "ewanna", "danna", "dpn", "dapan", "ona",
      "daham", "diym", "dhm", "save", "status", "ඕනි", "ඕනී", "ewm", "ewnn"
    ];

    if (!keywords.includes(bdy)) return;

    const quoted = m.quoted;
    const buffer = await quoted.download();

    switch (quoted.type) {
      case "imageMessage":
        return await robin.sendMessage(m.chat, { image: buffer, caption: quoted.caption || "" }, { quoted: mek });

      case "videoMessage":
        return await robin.sendMessage(
          m.chat,
          {
            video: buffer,
            mimetype: "video/mp4",
            fileName: `${m.id}.mp4`,
            caption: quoted.caption || "",
          },
          { quoted: mek }
        );

      case "audioMessage":
        return await robin.sendMessage(
          m.chat,
          {
            audio: buffer,
            mimetype: "audio/mp4",
            ptt: true,
          },
          { quoted: mek }
        );

      case "stickerMessage":
        return await robin.sendMessage(m.chat, { sticker: buffer }, { quoted: mek });

      case "extendedTextMessage":
        return await robin.sendMessage(m.chat, { text: quoted.text || "❌ Couldn't get message" }, { quoted: mek });

      default:
        return reply("😥 *invalid media type.*");
    }
  }
);
