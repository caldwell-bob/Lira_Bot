require("dotenv").config();

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var keys = require("./keys.js");

var myArgvs = process.argv;

var command = myArgvs[2];
var artist = myArgvs[3];

function doWhatItSays() {
    
}

function concertThis() {
  // Then run a request with axios to the OMDB API with the movie specified
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      // Print any non 200 status code
      if (response.status != 200) {
        console.log(response.status);
      }
      // check if there was an artist passed at cli
      if (!artist) {
        console.log("You aint got no artist...try again");
      } else {
        var responseData = response.data;
        console.log("Concert Info for: " + artist);
        // check if there are any concerts or not
        if (responseData.length === 0) {
          console.log("No concerts found for " + artist);
        } else {
          for (var i = 0; i < responseData.length; i++) {
            //   console.log("Venue: " + responseData[i].venue.name + " - " + responseData[i].datetime);
            var location =
              responseData[i].venue.city + ", " + responseData[i].venue.region;
            console.log("Show ID: " + i);
            console.log("               Venue: " + responseData[i].venue.name);
            console.log("               " + responseData[i].datetime);
            // TODO Fix outut of the date MM/DD/YY
            //   console.log("     " + moment((responseData[i].datetime).format('MM/DD/YY')));
            console.log("               " + location);
            //   console.log("\n");
          }
          // TODO Add a better message when no concerts found
        }
      }
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

function movieThis() {
  console.log("In movieThis()");
  axios
    .get(
      "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("The movie's title is: " + response.data.Title);
      console.log("Released: " + response.data.Released);
      console.log("The movie's IBMD rating is: " + response.data.imdbRating);

      //   console.log(response.data.Ratings);
      //   console.log(response.data.Ratings.Source['Rotten Tomatoes'].Value)
      var sources = response.data.Ratings;
      for (var i = 0; i < sources.length; i++) {
        // console.log(sources[i].Source);
        if (sources[i].Source === "Rotten Tomatoes") {
          console.log(
            "The movie's Rotten Tomatoes rating is: " + sources[i].Value
          );
        }
      }

      //   console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings.Source['Rotten Tomatoe']);
      console.log("Released: " + response.data.Released);

      //   console.log(response.data);
    });
}

function spotifyThis() {
  if (!artist) {
      artist = "The Sign";
  } 
  spotify.search({ type: "track", query: artist }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var items = data.tracks.items;

    console.log(Object.getOwnPropertyNames(items));
    console.log(items['0']);
    // itemRecord = JSON.parse(items["0"].artists);

    artistRecord = JSON.parse(JSON.stringify(items["0"].artists));
    albumRecord = JSON.parse(JSON.stringify(items["0"].album));
    previewUrl = JSON.parse(JSON.stringify(items["0"].preview_url));


    console.log("Artist: " + artistRecord['0'].name);
    console.log("Song: " + artist);
    console.log("Preview Url: " + previewUrl); 
    console.log("Album: " + albumRecord.name);

  });

}

switch (command) {
  case "concert-this":
    // console.log("concert-this");
    concertThis();

    break;

  case "spotify-this-song":
    console.log("spotify-this-song");
    spotifyThis();
    break;

  case "movie-this":
    console.log("movie-this");
    movieThis();
    break;

  case "do-what-it-says":
    console.log("do-what-it-says");
    break;

  default:
    if (typeof command === "undefined") {
      console.log("No arguement passed:");
    } else {
      console.log("Invalid argument passed: " + command);
    }
    console.log(
      "concert-this | spotify-this-song | movie-this | do-what-it-says"
    );
    console.log("example: node lira concert-this Phish");
}
