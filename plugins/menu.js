const { cmd, commands } = require("../command");
const config = require('../config');

cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],
    react: "📜",
    desc: "Get bot command list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      pushname,
      reply,
    }
  ) => {
    try {
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        if (cmd.pattern && !cmd.dontAddCommandList) {
          const line = `┃   ▪️ ${config.PREFIX}${cmd.pattern}\n`;
          if (menu[cmd.category]) {
            menu[cmd.category] += line;
          }
        }
      }

      const madeMenu = `*Hey Welcome  ${pushname}*
⛧━━━━━[ *MAHII-MD-V2 MENU* ]━━━━━⛧

╭─╼━━━━━━━━━━━━━━━━━━╾─╮
┃ ⚙️ *MAIN COMMANDS* ⚙️
┃   ▪️ .alive
┃   ▪️ .menu
┃   ▪️ .ai <text>
┃   ▪️ .system
┃   ▪️ .owner
╰─╼━━━━━━━━━━━━━━━━━━╾─╯

╭─╼━━━━━━━━━━━━━━━━━━╾─╮
┃ 📥 *DOWNLOAD COMMANDS* 📥
┃   ▪️ .song <text>
┃   ▪️ .video <text>
┃   ▪️ .fb <link>
╰─╼━━━━━━━━━━━━━━━━━━╾─╯

╭─╼━━━━━━━━━━━━━━━━━━╾─╮
┃ 👑 *OWNER COMMANDS* 👑
┃   ▪️ .restart
┃   ▪️ .update
╰─╼━━━━━━━━━━━━━━━━━━╾─╯

╭─╼━━━━━━━━━━━━━━━━━━╾─╮
┃ 🔁 *CONVERT COMMANDS* 🔁
┃   ▪️ .sticker <reply img>
┃   ▪️ .img <reply sticker>
┃   ▪️ .tr <lang> <text>
┃   ▪️ .tts <text>
╰─╼━━━━━━━━━━━━━━━━━━╾─╯

⛧━━━━━━[ MADE BY MIHIRANGA ]━━━━━━⛧`;

      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/ChatGPT%20Image%20Apr%2021,%202025,%2005_32_50%20PM.png?raw=true",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply("❌ Menu error:\n" + e);
    }
  }
);
