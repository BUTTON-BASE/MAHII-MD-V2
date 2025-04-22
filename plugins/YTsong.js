const { cmd, commands } = require("../command");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a song name or link.* ⚠");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      let desc = `
*🎵 MAHII-MD SONG DOWNLOADER 🎵*

*🎧 Title:* ${data.title}
*🕐 Duration:* ${data.timestamp}
*📅 Uploaded:* ${data.ago}
*👁️ Views:* ${data.views}
*🔗 URL:* ${data.url}

_𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*_
      `;

      await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Duration check
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ Sorry, audio limit is 30 minutes.");
      }

      const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });

      await robin.sendMessage(
        from,
        {
          audio: stream,
          mimetype: "audio/mpeg",
          ptt: false,
        },
        { quoted: mek }
      );

      return reply("*✅ Downloaded Successfully!* 🎶");
    } catch (e) {
      console.error(e);
      return reply(`❌ Error: ${e.message}`);
    }
  }
);
