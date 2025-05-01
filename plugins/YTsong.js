const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

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
    { from, q, reply }
  ) => {
    try {
      if (!q) return reply("*Please provide link or song name* 🌚❤️");

      const search = await yts(q);
      const data = search.videos[0];
      if (!data) return reply("❌ No results found.");

      const url = data.url;

      const desc = `
╭───────⬣
│  🧩 *MAHII-MD DOWNLOADER* 🧩
╰──────────────⬣

🎶 *Song Title:* ${data.title}

⏱️ *Duration:* ${data.timestamp}

📅 *Uploaded:* ${data.ago}

👁️ *Views:* ${data.views}

🔗 *Link:* ${url}

*𝙈𝘼𝘿𝙀 𝘽𝙔 𝙈𝙄𝙃𝙄𝙍𝘼𝙉𝙂𝘼*
`;

      await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      const quality = "128";
      const songData = await ytmp3(url, quality);
      if (!songData?.download?.url) return reply("❌ Failed to fetch audio file.");

      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) return reply("⏱️ Audio limit is 30 minutes.");

      await robin.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
        },
        { quoted: mek }
      );

      return reply("*✅ Thanks for using my bot* ❤️");
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
