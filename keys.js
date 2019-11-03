console.log('keys.js has been loaded');

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

console.log("spotify just defined in keys.js");
console.log(spotify);
exports.spotify;


