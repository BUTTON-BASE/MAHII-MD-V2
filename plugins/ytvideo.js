// plugins/video.js
const { cmd } = require("../command");
const yts = require("yt-search");
const { ytvideo } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "video",
    alias: ["mp4", "ytvideo"],
    desc: "Download YouTube video as MP4",
    category: "download",
    react: "📹",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { reply, args }) => {
    try {
      const query = args.join(" ");
      if (!query) return reply("❌ Please provide a YouTube URL or search term!");

      // Simple URL validation
      let url;
      try {
        url = new URL(query).toString();
      } catch {
        // Not a URL, do a search
        const search = await yts(query);
        if (!search.videos.length) return reply("❌ No videos found for that query!");
        url = search.videos[0].url;
      }

      // Fetch video details & download link
      const videoData = await ytvideo(url);
      if (!videoData) return reply("❌ Could not retrieve video data!");

      const info = videoData.videoDetails;
      const seconds = info.lengthSeconds;
      if (seconds > 600) return reply("⏱️ Video longer than 10 minutes, cannot download.");

      // Send thumbnail + metadata
      const caption = `
╭───⬣
│  📹 *MAHII-MD VIDEO DOWNLOADER* 📹
╰────────────⬣

📌 *Title:* ${info.title}

⏱️ *Duration:* ${Math.floor(seconds/60)}m ${seconds%60}s

👀 *Views:* ${info.viewCount}

🔗 *URL:* ${url}

🚀 *Made by MIHIRANGA*
      `.trim();

      await robin.sendMessage(
        mek.key.remoteJid,
        { image: { url: info.thumbnails.pop().url }, caption },
        { quoted: mek }
      );

      // Send the MP4 video
      await robin.sendMessage(
        mek.key.remoteJid,
        {
          video: { url: info.videoUrl },
          mimetype: "video/mp4",
          caption: `✅ Downloaded: ${info.title}`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
