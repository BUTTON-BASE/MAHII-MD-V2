// plugins/song.js
const { cmd } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song (audio or document)",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
      if (!q) return reply("❌ Please provide a song name or YouTube link.");

      const search = await yts(q);
      const data = search.videos[0];
      if (!data) return reply("❌ No video found for that query.");
      const url = data.url;

      const prompt = `
╭───────⬣
│  🧩 *MAHII-MD DOWNLOADER* 🧩
╰──────────────⬣

🎶 *Title:* ${data.title}
⏱️ *Duration:* ${data.timestamp}
👁️ *Views:* ${data.views}

🔗 *Link:* ${url}

📤 *Choose file type:*
1. *MP3 (audio)*
2. *MP3 (document)*

*Reply with 1 or 2*

𝙈𝘼𝘿𝙀 𝘽𝙔 𝙈𝙄𝙃𝙄𝙍𝘼𝙉𝙂𝘼
`;

      const sent = await robin.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: prompt },
        { quoted: mek }
      );

      const incoming = await waitForMessage(
        robin,
        (msg) =>
          !msg.key.fromMe &&
          msg.key.remoteJid === from &&
          msg.message?.conversation?.trim().match(/^[1-2]$/),
        60000
      );
      const choice = incoming.message.conversation.trim();

      // ✅ React to user's reply
      await robin.sendMessage(from, {
        react: {
          text: choice === "1" ? "🎧" : "📩",
          key: incoming.key,
        },
      });

      const timeout = (ms) =>
        new Promise((_, rej) => setTimeout(() => rej(new Error("Timed Out")), ms));
      const songData = await Promise.race([ytmp3(url, "128"), timeout(20000)]);

      if (!songData?.download?.url) {
        return reply("❌ Failed to retrieve audio. Please try again later.");
      }

      const parts = data.timestamp.split(":").map(Number);
      const seconds =
        parts.length === 3
          ? parts[0] * 3600 + parts[1] * 60 + parts[2]
          : parts[0] * 60 + parts[1];
      if (seconds > 1800) return reply("⏱️ Audio limit is 30 minutes.");

      await handleDownload(choice, from, songData, mek, reply, data, robin);
    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);

// ✅ Updated to include `robin` in download function
async function handleDownload(choice, from, songData, mek, reply, data, robin) {
  try {
    if (choice === "1") {
      await robin.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );
    }

    if (choice === "2") {
      await robin.sendMessage(
        from,
        {
          document: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "*𝙈𝘼𝘿𝙀 𝘽𝙔 𝙈𝙄𝙃𝙄𝙍𝘼𝙉𝙂𝘼*",
        },
        { quoted: mek }
      );
    }

    await reply("✅ Download sent! Enjoy your music 🎶");
  } catch (e) {
    console.error(e);
    if (e.message === "Timed Out") {
      return reply("⏳ You took too long to reply. Please run the command again.");
    }
    reply(`❌ Error: ${e.message}`);
  }
}

// 🔁 Helper: waitForMessage
function waitForMessage(sock, check, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      sock.ev.off("messages.upsert", onMsg);
      reject(new Error("Timed Out"));
    }, timeoutMs);

    function onMsg({ messages }) {
      for (const msg of messages) {
        if (check(msg)) {
          clearTimeout(timeout);
          sock.ev.off("messages.upsert", onMsg);
          resolve(msg);
          break;
        }
      }
    }

    sock.ev.on("messages.upsert", onMsg);
  });
}
