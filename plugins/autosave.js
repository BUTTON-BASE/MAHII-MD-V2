const { cmd } = require("../command");
const { saveContact } = require("@whiskeysockets/baileys");

cmd(
  {
    pattern: "savecontact",
    desc: "Save contact with real name",
    category: "tools",
    react: "💾",
    filename: __filename,
    fromMe: false,
  },
  async (robin, mek, m, { quoted, reply, isCmd, args, q }) => {
    try {
      // Check if the message is a contact message
      if (!quoted || !quoted.message.contactMessage) {
        return reply("❌ Please reply to a contact message to save it.");
      }

      const contact = quoted.message.contactMessage;
      const phoneNumber = contact.vcard.split("\n")[0].replace("TEL:", "").trim(); // Extract the phone number from vCard
      const realName = contact.displayName.trim(); // Extract the real name of the contact

      // Save the contact to the phonebook using Baileys
      const contactInfo = {
        name: realName,
        number: phoneNumber,
      };

      // Here, we assume saveContact is a utility that helps save contacts. (Baileys does not natively support saving contacts)
      // This may need custom handling depending on your setup
      await robin.contactAdd(contactInfo);

      reply(`✅ Contact saved successfully: ${realName} - ${phoneNumber}`);
    } catch (e) {
      console.error(e);
      reply("❌ Failed to save contact.");
    }
  }
);
