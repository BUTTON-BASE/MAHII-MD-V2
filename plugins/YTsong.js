const { cmd } = require("../command");
const yts = require("yt-search");
const dylux = require("api-dylux");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, q, reply }) => {
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

📤 *Choose file type:*

1. *MP3 (audio)*
2. *MP3 (document)*

*𝙈𝘼𝘿𝙀 𝘽𝙔 𝙈𝙄𝙃𝙄𝙍𝘼𝙉𝙂𝘼*
`;

      const sent = await robin.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
        },
        { quoted: mek }
      );

      // Wait for number reply (1 or 2)
      const incoming = await robin.waitForMessage(
        (msg) =>
          msg.key.fromMe === false &&
          msg.message?.conversation?.match(/^[1-2]$/),
        60000
      );

      const choice = incoming.message.conversation.trim();

      // Download MP3 using api-dylux
      const result = await dylux.ytmp3(url);
      if (!result || !result.dl_link) return reply("❌ Failed to download audio.");

      const filename = `${data.title}.mp3`;

      if (choice === "1") {
        await robin.sendMessage(from, {
          react: { text: "🎵", key: incoming.key },
        });

        await robin.sendMessage(
          from,
          {
            audio: { url: result.dl_link },
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
            document: { url: result.dl_link },
            mimetype: "audio/mpeg",
            fileName: filename,
            caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*",
          },
          { quoted: incoming }
        );
      } else {
        return reply("❌ Invalid choice.");
      }

      await reply("*✅ Sent successfully. Enjoy!* 🎶");
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
