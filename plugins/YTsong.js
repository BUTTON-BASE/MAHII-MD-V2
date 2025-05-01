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
  async (robin, mek, m, { from, quoted, q, reply, isCreator }) => {
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

      const filter = (msg) => msg.key.remoteJid === from && msg.message?.conversation?.trim();
      const collector = robin.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages?.[0];
        if (!msg || !msg.message) return;

        const choice = msg.message.conversation.trim();
        if (!["1", "2"].includes(choice)) return reply("❌ Invalid option. Use *1* or *2*.");

        const durationParts = data.timestamp.split(":").map(Number);
        const totalSeconds = durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

        if (totalSeconds > 1800) return reply("⏱️ Audio limit is 30 minutes.");

        try {
          const songData = await ytmp3(url, "128");

          if (choice === "1") {
            await robin.sendMessage(from, {
              audio: { url: songData.download.url },
              mimetype: "audio/mpeg",
            }, { quoted: msg });
          } else if (choice === "2") {
            await robin.sendMessage(from, {
              document: { url: songData.download.url },
              mimetype: "audio/mpeg",
              fileName: `${data.title}.mp3`,
              caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 *MIHIRANGA*",
            }, { quoted: msg });
          }

          await reply("*✅ Sent successfully. Enjoy!* 🎶");

        } catch (err) {
          console.log(err);
          reply(`❌ Error while downloading: ${err.message}`);
        }

        robin.ev.off("messages.upsert", collector); // Stop listening after response
      });

    } catch (e) {
      console.log(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
