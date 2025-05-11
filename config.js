const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "xiN0kRza#rmgPpXYn3t6mxHsmyTlm97M3bb2qeEu6T2YZplF7wQw",
  OWNER_NUM: process.env.OWNER_NUM || "94714971189",
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "true",
  MODE : process.env.Mode || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_STICKER : process.env.AUTO_STICKER || "true",
  AUTO_REPLY : process.env.AUTO_REPLY || "true", 
  AUTO_STATUS_LIKE: process.env.AUTO_STATUS_LIKE || "true", 
  AUTO_REACT:process.env.AUTO_REACT || true,


};
