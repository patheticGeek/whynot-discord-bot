require("dotenv").config();
const Discord = require("discord.js");
const { clearLogs, logger } = require("./util/logger");

const prefix = process.env.PREFIX;
const client = new Discord.Client();

client.on("ready", () => {
  logger(`Bot ready with prefix ${process.env.PREFIX}`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send("Pong.");
  } else if (command === "beep") {
    message.channel.send("Boop.");
  } else if (command === "boop") {
    message.channel.send("Beep.");
  }
});

clearLogs();

if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN);
} else {
  logger("Please add an env var DISCORD_BOT_TOKEN");
}
