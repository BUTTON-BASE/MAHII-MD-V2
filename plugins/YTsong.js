
const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd(
  {
    pattern: "mp3",
    react: "🎵",
    desc: "Download YouTube Audio",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, args, reply }) => {
    try {
      const q = args.join(" ");
      if (!q) return reply("*Provide a name or a YouTube link.* 🎵❤️");

      // 1) Find the URL
      let url = q;
      try {
        url = new URL(q).toString();
      } catch {
        const s = await yts(q);
        if (!s.videos.length) return reply("❌ No videos found!");
        url = s.videos[0].url;
      }

      // 2) Send metadata + thumbnail
      const info = (await yts(url)).videos[0];
      const desc = `
🧩 *MAHII-MD AUDIO DOWNLOADER* 🧩

📌 *Title:* ${info.title}

⏱️ *Uploaded:* ${info.timestamp} (${info.ago})

👀 *Views:* ${info.views}

🔗 *Download URL:*
${info.url}

━━━━━━━━━━━━━━━━━━
*𝙈𝘼𝘿𝙀 𝘽𝙔 𝙈𝙃𝙄𝙍𝘼𝙉𝙂𝘼*
      `.trim();

      await robin.sendMessage(
        from,
        { image: { url: info.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // 3) Audio download helper
      const downloadAudio = async (videoUrl, quality = "mp3") => {
        const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${quality}&url=${encodeURIComponent(
          videoUrl
        )}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const res = await axios.get(apiUrl);
        if (!res.data.success) throw new Error("Failed to fetch audio details.");

        const { id, title } = res.data;
        const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

        // poll until ready
        while (true) {
          const prog = (await axios.get(progressUrl)).data;
          if (prog.success && prog.progress === 1000) {
            const audio = await axios.get(prog.download_url, { responseType: "arraybuffer" });
            return { buffer: audio.data, title };
          }
          await new Promise((r) => setTimeout(r, 5000));
        }
      };

      // 4) Download + send
      const { buffer, title } = await downloadAudio(url);
      await robin.sendMessage(
        from,
        {
          audio: buffer,
          mimetype: "audio/mpeg", // or "audio/mpeg" if mp3
          ptt: false,
          fileName: `${title}.mp3`,
        },
        { quoted: mek }
      );

      reply("*Thanks for using my MP3 bot!* 🎵");
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

      // Validate song duration (limit: 30 minutes)
      
