const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "QBDTRSR#JVOPr4fXTS_7nTIQVqrYbfMJGMtIMqjWZUT2wtH7TtU",
  OWNER_NUM: process.env.OWNER_NUM || "94714971189",
  PREFIX: process.env.PREFIX || ".",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/ChatGPT%20Image%20Apr%2021,%202025,%2005_32_50%20PM.png?raw=true",
  ALIVE_MSG: process.env.ALIVE_MSG || `\`\`\`
⛧━━━[ 🤖 BOT STATUS PANEL ]━━━⛧

⚡ SYSTEM     : ONLINE
⚡ BOT NAME   : MAHII-MD-V2
⚡ OWNER      : MIHIRANGA
⚡ VERSION    : v2.0.1

⛧━━━[ 🛡️ STATUS CHECK ]━━━⛧

🧠 AI         : ACTIVE
💾 MEMORY     : STABLE
🌐 NETWORK    : CONNECTED
📡 SIGNAL     : STRONG

⛧━━━[ ⚠️ DISCLAIMER ]━━━⛧

⚠️ We are not responsible for any 
WhatsApp bans that may occur due to 
the usage of this bot. Use it wisely 
and at your own risk.

⛧━━━[ 🖤 MAHII-MD-V2 ]━━━⛧

⚙️ Use *.menu* to explore commands  
💬 Bot crafted by Mihiranga
\`\`\``,
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE : process.env.Mode || "public",
};
