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
  async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
      if (!q) return reply("*Please provide a YouTube link or song name* ❤️");

      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      const desc = `
╭───────⬣
│  🧩 *MAHII-MD DOWNLOADER* 🧩
╰──────────────⬣

📌 *Title:* ${data.title}


📝 *Description:* ${data.description}


⏱️ *Uploaded:* ${data.timestamp} (${data.ago})


👀 *Views:* ${data.views}


🔗 *Link:* ${data.url}

━━━━━━━━━━━━━━━━━━
🔘 *Choose format:*
Reply with *1* for mp3
Reply with *2* for document

🛠️ Made by *MIHIRANGA*
`;

      await robin.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: desc.trim(),
      }, { quoted: mek });

      // Add a listener for response
      robin.ev.once("messages.upsert", async ({ messages }) => {
        try {
          const incoming = messages[0];
          if (!incoming.message || !incoming.message.conversation) return;
          const choice = incoming.message.conversation.trim();

          const durationParts = data.timestamp.split(":").map(Number);
          const totalSeconds =
            durationParts.length === 3
              ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
              : durationParts[0] * 60 + durationParts[1];

          if (totalSeconds > 1800) return reply("⏱️ Audio limit is 30 minutes.");

          const songData = await ytmp3(url, "128");

          if (choice === "1") {
            await robin.sendMessage(from, {
              audio: { url: songData.download.url },
              mimetype: "audio/mpeg",
            }, { quoted: incoming });
          } else if (choice === "2") {
            await robin.sendMessage(from, {
              document: { url: songData.download.url },
              mimetype: "audio/mpeg",
              fileName: `${data.title}.mp3`,
              caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*",
            }, { quoted: incoming });
          } else {
            return reply("❌ Invalid option selected.");
          }

          await reply("*✅ Sent successfully. Enjoy!* 🎶");

        } catch (err) {
          console.log(err);
          reply(`❌ Error: ${err.message}`);
        }
      });

    } catch (e) {
      console.log(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
