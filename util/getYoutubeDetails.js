const ytdl = require("ytdl-core");
const youtubeNode = require("youtube-node");
const humanTime = require("./humanTime");

async function getYoutubeDetails(link) {
  if (!ytdl.validateURL) throw new Error("Given URL is not a valid youtube link");
  try {
    const data = await ytdl.getBasicInfo(link);
    const { title, lengthSeconds } = data.videoDetails;
    return { title, duration: humanTime(lengthSeconds) };
  } catch (e) {
    throw new Error("Error fetching details");
  }
}

module.exports = getYoutubeDetails;
