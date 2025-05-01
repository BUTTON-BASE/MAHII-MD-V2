const { cmd } = require("../command");

cmd(
{
  on: "body"
},
async (robin, mek, m, { from, body }) => {
  if (!m.quoted || !mek || !mek.message || !body) return;

  const data = JSON.stringify(mek.message, null, 2);
  const jsonData = JSON.parse(data);
  const isStatus = jsonData?.extendedTextMessage?.contextInfo?.remoteJid;

  if (!isStatus) return;

  let bdy = body.toLowerCase();
  let keywords = ["දියම්", "දෙන්න", "දාන්න", "එවන්න", "ඕන", "ඕනා", "එවපන්", "දාපන්", "එව්පන්", "send", "give", "ewpn", "ewapan", "ewanna", "danna", "dpn", "dapan", "ona", "daham", "diym", "dhm", "save", "status", "ඕනි", "ඕනී", "ewm", "ewnn"];
  let kk = keywords.map(word => word.toLowerCase());

  if (kk.includes(bdy)) {
    const defaultCaption = `𝙈𝘼𝙃𝙄𝙄 𝙈𝘿 𝙎𝙏𝘼𝙏𝙐𝙎 𝘿𝙊𝙒𝙉𝙇𝙊𝘿𝙀𝙍`;
    let original = m.quoted.caption || m.quoted.msg?.text || '';

    let finalCaption = defaultCaption;
    if (original) {
      finalCaption += `\n\n📌*Caption:*\n${original}`;
    }

    if (m.quoted.type === 'imageMessage') {
      let buff = await m.quoted.download();
      return await robin.sendMessage(from, {
        image: buff,
        caption: finalCaption
      });

    } else if (m.quoted.type === 'videoMessage') {
      let buff = await m.quoted.download();
      return await robin.sendMessage(from, {
        video: buff,
        mimetype: "video/mp4",
        fileName: `${m.id}.mp4`,
        caption: finalCaption
      }, { quoted: mek });

    } else if (m.quoted.type === 'audioMessage') {
      let buff = await m.quoted.download();
      return await robin.sendMessage(from, {
        audio: buff,
        mimetype: "audio/mp3",
        ptt: true
      }, { quoted: mek });

    } else if (m.quoted.type === 'extendedTextMessage') {
      await robin.sendMessage(from, { text: finalCaption });
    }
  }
});
