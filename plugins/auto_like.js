// plugins/auto_like.js
const config = require("../config");

module.exports = async (robin, m) => {
  try {
    if (config.AUTO_STATUS_LIKE !== "true") return; // Only if auto like enabled

    // Check if it's a 'status' type message
    const isStatusBroadcast = m.key.remoteJid === "status@broadcast";
    if (!isStatusBroadcast) return; // Not a status

    // Check if the message has media (image/video/text)
    if (m.message?.imageMessage || m.message?.videoMessage || m.message?.extendedTextMessage) {
      // React to the status
      await robin.sendMessage(m.key.remoteJid, {
        react: {
          text: "❤️", // You can change to 🔥 😍 😘 etc
          key: m.key
        }
      });
    }
  } catch (err) {
    console.error("Auto Like Error:", err);
  }
};
