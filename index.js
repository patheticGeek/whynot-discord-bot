require("dotenv").config();
const Discord = require("discord.js");
const { clearLogs, logger } = require("./util/logger");

const client = new Discord.Client();

client.on("ready", () => {
  logger(`Bot ready with prefix ${process.env.PREFIX}`);
});

clearLogs();

if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN);
} else {
  logger("Please add an env var DISCORD_BOT_TOKEN");
}
