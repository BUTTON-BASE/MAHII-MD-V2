const config = require("../config");

module.exports = async (robin, m) => {
  try {
    if (!config.AUTO_REACT) return;

    const fromMe = m.key.fromMe;
    if (fromMe || !m.message) return;

    // Define a list of random emojis
    const emojis = ["❤️", "🔥", "😂", "👍", "🥰", "💯", "😎", "👏", "🙌", "💖"];

    // Pick one randomly
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    // Send the reaction
    await robin.sendMessage(m.key.remoteJid, {
      react: {
        text: emoji,
        key: m.key,
      },
    });

  } catch (err) {
    console.error("Auto React Error:", err);
  }
};
