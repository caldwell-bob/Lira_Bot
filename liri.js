require("dotenv").config();

// fs is a core Node package for reading and writing files
var fs = require("fs");

// Include the moment npm package (Don't forget to run npm install moment in this folder first)
var moment = require("moment");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var keys = require("./keys.js");

// node-spotify-api is the Spoitify api used
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var myArgvs = process.argv;
var command = myArgvs[2];

myArgvs.shift(); // remove node from array
myArgvs.shift(); // remove liri from array
myArgvs.shift(); // remove commad from array
var artist = myArgvs.join(" ");


function concertThis() {
  if (!artist) {
    console.log("You need to pass in an artist name.");
  } else {
    // Then run a request with axios to the Bands in Town API with the movie specified
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
          console.log("Concert Info for: " + artist + "\n");
          // check if there are any concerts or not
          if (responseData.length === 0) {
            console.log("No concerts found for " + artist);
          } else {
            for (var i = 0; i < responseData.length; i++) {
              //   console.log("Venue: " + responseData[i].venue.name + " - " + responseData[i].datetime);
              var location =
                responseData[i].venue.city +
                ", " +
                responseData[i].venue.region;
              
              console.log(
                "Venue: " + responseData[i].venue.name
              );
          
              var concertDate = moment(responseData[i].datetime).format(
                "MM-DD-YYYY"
              );
              console.log("Date: " + concertDate);
              console.log(location + "\n");
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
}

function spotifyThis() {
  if (!artist) {
    artist = "The Sign";
    var noArtistPassedIn = true;
  }
  spotify.search({ type: "track", query: artist }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var items = data.tracks.items;
    console.log("There are " + items.length + " results from that search.");

    // only display all searches is an artist was passed in
    if (noArtistPassedIn) {
      for (var i = 0; i < items.length; i++) {
        artistRecord = JSON.parse(JSON.stringify(items[i].artists));
        albumRecord = JSON.parse(JSON.stringify(items[i].album));
        previewUrl = JSON.parse(JSON.stringify(items[i].preview_url));

        if (artistRecord[0].name === "Ace of Base") {
          console.log("Artist: " + artistRecord[0].name);
          console.log("Song: " + artist);
          console.log("Preview Url: " + previewUrl);
          console.log("Album: " + albumRecord.name + "\n");
          break;
        }
      }
    } else {
      for (var i = 0; i < items.length; i++) {
        artistRecord = JSON.parse(JSON.stringify(items[i].artists));
        albumRecord = JSON.parse(JSON.stringify(items[i].album));
        previewUrl = JSON.parse(JSON.stringify(items[i].preview_url));

        console.log("Artist: " + artistRecord[0].name);
        console.log("Song: " + artist);
        console.log("Preview Url: " + previewUrl);
        console.log("Album: " + albumRecord.name + "\n");
      }
    }
  });
}

function movieThis() {
  // console.log("In movieThis()");
  //  remember+the+titans
  if (!artist) {
    artist = "Mr. Nobody";
  }
  axios
    .get(
      "http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      // console.log(response);
      // * Let's check if there is a movie search result found
      dataCheck = response.data.Error;
      if (dataCheck) {
        console.log(dataCheck);
      } else {
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
        console.log("The movie was produced in " + response.data.Country);
        console.log(response.data.Language + " is the language of the movie.");
        console.log("The plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }

      //   console.log(response.data);
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
   
    // Split text of file at comma
    var dataArr = data.split(",");
    command = dataArr[0];
    artist = dataArr[1].slice(0, -1); // remove \n added by split
    main();
  });
}

function main() {
  switch (command) {
    case "concert-this":
      concertThis();
      break;

    case "spotify-this-song":
      spotifyThis();
      break;

    case "movie-this":
      movieThis();
      break;

    case "do-what-it-says":
      doWhatItSays();
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
}

main();
