const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "jUQi2QDK#JeiisEI15Q1VUSMsBe4f_7M4nFzPT4HAJfOpoqQXwa4",
  OWNER_NUM: process.env.OWNER_NUM || "94721229780",
  PREFIX: process.env.PREFIX || ".",
};
