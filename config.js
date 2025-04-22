const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "yZRG2QIC#dDWrpypLQXIefoz5V92nE4cS1baKLBeC6Xr1v0hX3nU",
  MONGODB: process.env.MONGODB || "mongodb://mongo:BkspBConSbfMmxoPWhCAtizcPcVFEnIb@hopper.proxy.rlwy.net:36316",
  OWNER_NUM: process.env.OWNER_NUM || "94721229780",
};
