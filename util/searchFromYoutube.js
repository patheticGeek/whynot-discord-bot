const Youtube = require("youtube-node");

function searchFromYoutube(query) {
  return new Promise((resolve, reject) => {
    const youtube = new Youtube();
    youtube.setKey("AIzaSyBgohTU6dlttU-c9gmzgqqY71eKIxYVTFk");
    youtube.search(query, 1, function (error, result) {
      if (error) {
        reject("Cannot find any videos or an error occured");
      } else {
        const {
          id: { kind, videoId },
          snippet: { title }
        } = result.items[0];
        resolve({ id: videoId, title });
      }
    });
  });
}

module.exports = searchFromYoutube;
