const { cmd } = require("../command");
const fs = require("fs");
const { exec } = require("child_process");
const gTTS = require("gtts");

cmd({
    pattern: "tts",
    desc: "Convert text to speech",
    category: "tools",
    filename: __filename,
},
async (robin, mek, m, { args, from, reply }) => {
    const text = args.join(" ");
    if (!text) return reply("⚠️ Please provide text to convert to speech!");

    const filePath = "./tmp/tts.mp3";
    const gtts = new gTTS(text, "si"); // 'si' for Sinhala

    gtts.save(filePath, async (err) => {
        if (err) return reply("❌ Failed to convert text to speech.");
        const audio = fs.readFileSync(filePath);
        await robin.sendMessage(from, {
            audio,
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: mek });
        fs.unlinkSync(filePath);
    });
});
