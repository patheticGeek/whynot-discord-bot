require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { clearLogs, logger } = require("./util/logger");

const prefix = process.env.PREFIX;
const client = new Discord.Client();

function setCommands(client) {
  client.commands = new Discord.Collection();

  const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
  }
}

client.on("ready", () => {
  logger(`Bot ready with prefix ${process.env.PREFIX}`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

clearLogs();

if (process.env.DISCORD_BOT_TOKEN) {
  setCommands(client);
  client.login(process.env.DISCORD_BOT_TOKEN);
} else {
  logger("Please add an env var DISCORD_BOT_TOKEN");
}
