const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    {
        key: 'ALIVE_IMG',
        value: 'https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/ChatGPT%20Image%20Apr%2021,%202025,%2005_32_50%20PM.png?raw=true'
    },
    {
        key: 'ALIVE_MSG',
        value: `⛧━━━━━━[ 🤖 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦 ]━━━━━━⛧
┃
┃  ⚡ SYSTEM : ONLINE
┃  ⚡ BOT NAME : MAHII-MD-V2
┃  ⚡ OWNER : MIHIRANGA
┃  ⚡ VERSION : v2.0.1
┃
⛧━━━━━━[ 🔰 STATUS OK 🔰 ]━━━━━━⛧
┃
┃  🧠 AI : ACTIVE
┃  💾 MEMORY : STABLE
┃  🌐 NETWORK : CONNECTED
┃  📡 SIGNAL : STRONG
┃
⛧━━━━━━[ ⚠️ DISCLAIMER ⚠️ ]━━━━━━⛧
┃
┃ ⚠️ We are not responsible for any
┃ WhatsApp bans that may occur due to
┃ the usage of this bot. Use it wisely
┃ and at your own risk.
┃
⛧━━━━━━[ 🖤 MAHII-MD-V2 🖤 ]━━━━━━⛧
┃
┃  ⚙️ Use *.menu* to explore commands
┃  💬 Bot crafted by Mihiranga
┃
⛧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⛧`
    },
    {
        key: 'PREFIX',
        value: '.'
    }
];
// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
