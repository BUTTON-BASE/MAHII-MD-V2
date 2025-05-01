plugins/fbdown.js
const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "fb",
    react: "📘",
    desc: "Download Facebook video",
    category: "download",
    filename: __filename,
  },
  async (robin, mek, m, { from, args, reply }) => {
    const url = args[0];
    if (!url || !url.includes("facebook.com"))
      return reply("❌ *Please provide a valid Facebook video link.*");

    try {
      reply("🔎 Fetching Facebook video...");

      const api = `https://api.radiaa.repl.co/api/fb?url=${encodeURIComponent(url)}`;
      const res = await axios.get(api);
      const { hd, sd, title } = res.data.result;

      if (!sd && !hd) return reply("❌ Video not found or not public.");

      const videoUrl = hd || sd;

      await robin.sendMessage(
        from,
        {
          video: { url: videoUrl },
          caption: `📘 *${title || "Facebook Video"}*\n\n𝙈𝘼𝙃𝙄𝙄 𝙈𝘿 𝙁𝘽 𝘿𝙊𝙒𝙉𝙇𝙊𝘿𝙀𝙍`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ *Failed to download:* ${e.message}`);

    }})
