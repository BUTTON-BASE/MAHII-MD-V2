const { cmd } = require("../command");
const { getRandom } = require('../lib/functions');
const fs = require('fs');

cmd(
{
on: "body"
},
async (robin, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
if (!m.quoted) return;
if (!mek && !mek.message && !body) return;

const data = JSON.stringify(mek.message, null, 2)
const jsonData = JSON.parse(data);
const isStatus = jsonData?.extendedTextMessage?.contextInfo?.remoteJid;

if(!isStatus) return;
let bdy = body.toLowerCase();
let keywords = ["දියම්", "දෙන්න", "දාන්න", "එවන්න", "ඕන", "ඕනා", "එවපන්", "දාපන්", "එව්පන්", "send", "give", "ewpn", "ewapan", "ewanna","danna", "ewapan", "dpn", "dapan", "ona","daham", "diym", "dhm", "save","status","ඕනි","ඕනී","ewm","ewnn"];  // මෙතනට උබට තව වචන ඕන්නම් ඔය විදිහට ඇඩ් කරගන්න 👈
let kk = keywords.map(word => word.toLowerCase());

if (kk.includes(bdy)) {
if(m.quoted.type === 'imageMessage') {
  
let buff =  await m.quoted.download()

const mimetype = m.quoted.imageMessage.mimetype;
const caption = m.quoted.imageMessage.caption;

return await robin.sendMessage(from, { image: buff, caption: caption })

}else if(m.quoted.type === 'videoMessage') {

let buff =  await m.quoted.download()

const mimetype = m.quoted.videoMessage.mimetype;
const seconds = m.quoted.videoMessage.seconds;
const caption = m.quoted.videoMessage.caption;


let buttonMessage = {
video: buff,
mimetype: "video/mp4",
fileName: `${m.id}.mp4`,
caption: caption,
headerType: 4
};
return await robin.sendMessage(from, buttonMessage, {
quoted: mek
});
}else if(m.quoted.type === 'audioMessage') {
let buff =  await m.quoted.download()
let buttonMessage = {
audio: buff,
mimetype: "audio/mp3",
fileName: `${m.id}.mp3`,
caption: `✉️ *audioMessage*`,
headerType: 4
};
return await robin.sendMessage(from, buttonMessage, {
quoted: mek
});

}else if(m.quoted.type === 'extendedTextMessage') {
await robin.sendMessage(from,{text: m.quoted.msg.text })

}
}
})

