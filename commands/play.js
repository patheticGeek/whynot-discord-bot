const ytdl = require("ytdl-core");
const getYoutubeDetails = require("../util/getYoutubeDetails");

// { type 'youtube', duration, title, link  }

let voiceChannels = {};

async function execute(message, args) {
  if (message.channel.type === "dm") return;

  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel) {
    return message.reply("Get yo ass in a voice channel first!");
  } else if (!args[0]) {
    return message.reply("Tell me what to play you dumbass!");
  }

  const voiceChannelId = voiceChannel.id;

  try {
    const link = args[0];
    if (voiceChannels[voiceChannelId]) {
      const details = await getYoutubeDetails(link);
      voiceChannels[voiceChannelId].push({ type: "youtube", link, title: details.title, duration: details.duration });
      console.log(voiceChannels[voiceChannelId]);
      message.channel.send(`:thumbsup: \`${details.title}\` added to queue at position ${voiceChannels[voiceChannelId].length - 1}`);
    } else {
      message.channel.send(`:mag_right: Searching **${link}**`);
      const details = await getYoutubeDetails(link);
      voiceChannels[voiceChannelId] = [{ type: "youtube", link, title: details.title, duration: details.duration }];
      const connection = await voiceChannel.join();
      await playIt(message, voiceChannel, connection);
    }
  } catch (e) {
    console.log(e);
    message.channel.send(`:x: ${e.message}`);
  }
}

async function playIt(message, voiceChannel, connection) {
  const channelId = message.member.voice.channel.id;
  const current = voiceChannels[channelId][0];
  if (current.type === "youtube") {
    message.channel.send(`:musical_note: Playing \`${current.title}\` - Now!`);
    await playFromYoutube(connection, current.link);
  }
  voiceChannels[channelId].splice(0, 1);
  if (voiceChannels[channelId].length > 0) playIt(message, voiceChannel, connection);
  else voiceChannel.leave();
}

function playFromYoutube(connection, link) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(link, { filter: "audioonly" });
    const dispatcher = connection.play(stream);

    dispatcher.on("finish", () => resolve());
  });
}

module.exports = {
  name: "play",
  description: "Play a song from youtube",
  execute
};
