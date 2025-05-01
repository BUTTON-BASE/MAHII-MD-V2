const { cmd } = require("../command");
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
    {
      from,
      quoted,
      body,
      args,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a YouTube link or song name* ❤️");

      const search = await yts(q);
      const data = search.videos[0];
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

📤 *Choose the file type to download:*
1. *MP3 (audio)*
2. *MP3 (document)*


🛠️ Made by *MIHIRANGA*
`;

      const sent = await robin.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Wait for a reply
      const incoming = await robin.waitForMessage(
        (msg) =>
          msg.key.fromMe === false &&
          msg.message &&
          msg.message.conversation &&
          msg.message.conversation.match(/^[1-2]$/),
        60000 // 60 seconds timeout
      );

      const choice = incoming.message.conversation.trim();
      const quality = "128";
      const songData = await ytmp3(url, quality);

      const durationParts = data.timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) return reply("⏱️ Audio limit is 30 minutes.");

      // React based on user choice
      if (choice === "1") {
        await robin.sendMessage(from, {
          react: { text: "🎵", key: incoming.key },
        });

        await robin.sendMessage(
          from,
          {
            audio: { url: songData.download.url },
            mimetype: "audio/mpeg",
          },
          { quoted: incoming }
        );
      } else if (choice === "2") {
        await robin.sendMessage(from, {
          react: { text: "📁", key: incoming.key },
        });

        await robin.sendMessage(
          from,
          {
            document: { url: songData.download.url },
            mimetype: "audio/mpeg",
            fileName: `${data.title}.mp3`,
            caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*",
          },
          { quoted: incoming }
        );
      } else {
        return reply("❌ Invalid option selected.");
      }

      await reply("*✅ Sent successfully. Enjoy!* 🎶");
    } catch (e) {
      console.log(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
