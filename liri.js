require("dotenv").config();

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// var keys = require("./keys.js");
// console.log(keys);
// TODO why does the following fail -
// var spotify = new Spotify(keys.spotify);

var myArgvs = process.argv;
// for (var i=0; i < myArgvs.length; i++){
//     console.log(i + "  = " + myArgvs[i]);
// }

var operand = myArgvs[2];
var artist = myArgvs[3];
console.log("x is " + myArgvs[2]);

function concertThis() {
  // Then run a request with axios to the OMDB API with the movie specified
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log(response.status);
    //   console.log(response);
      var responseData = response.data;
      console.log(responseData).length;
      //   console.log("The movie's rating is: " + response.data.imdbRating);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

switch (operand) {
  case "concert-this":
    console.log("concert-this");
    concertThis();
    break;

  case "spotify-this-song":
    console.log("spotify-this-song");
    break;

  case "movie-this":
    console.log("movie-this");
    break;

  case "do-what-it-says":
    console.log("do-what-it-says");
    break;

  default:
    console.log("Invalid argument passed: " + operand);
    console.log(
      "Allowable -> concert-this | spotify-this-song | movie-this | do-what-it-says"
    );
    console.log("example: node lira concert-this Phish");
}
