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

      // Create a named function so we can remove it properly later
      const onMessage = async (event) => {
        try {
          const msg = event?.messages?.[0];
          if (!msg || msg.key.remoteJid !== from || !msg.message?.conversation) return;

          const choice = msg.message.conversation.trim();
          if (!["1", "2"].includes(choice)) {
            await reply("❌ Invalid option. Use *1* or *2*.");
            return;
          }

          // Duration check
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
            }, { quoted: msg });
          } else {
            await robin.sendMessage(from, {
              document: { url: songData.download.url },
              mimetype: "audio/mpeg",
              fileName: `${data.title}.mp3`,
              caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*",
            }, { quoted: msg });
          }

          await reply("*✅ Sent successfully. Enjoy!* 🎶");
        } catch (err) {
          console.error("Error in format selection:", err);
          await reply(`❌ Error: ${err.message}`);
        } finally {
          robin.ev.off("messages.upsert", onMessage); // remove listener
        }
      };

      robin.ev.on("messages.upsert", onMessage);
    } catch (err) {
      console.error("Main error:", err);
      reply(`❌ Error: ${err.message}`);
    }
  }
);
