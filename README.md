# Lira_Bot
**Purpose:** Lira_Bot is a command line tool which accepts certain keywords and then performs some behind scene vodoo, ala apis and the like, to display info based off the users inputs.

## Command Options
- concert-this <artist>
- spotify-this-song <song>
- movie-this <>
- do-what-it-says [reads command/input from random.txt]

### concert-this [artist]
This command queries the Bands in Town Events apis for the artist passed in and either states there are no upcoming concerts, or lists the following for each tour date found:
- Name of Venue
- Venue Location
- Date of Event

**No Artist Passed In**
! [No artist passed in](./images/concert_this_no_args_passed.png)


### spotify-this-song [song]
This command queries the spotify api, for song passed in and displays the following:
- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from

### movie-this [movie]
This command queries the OMDB API and returns the following, based off the movie passed in:
- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

Note:  if no movie is passed in with the command, we are defaulting to searching for Mr. Nobody.

### do-what-is-days
This command will perform the command written in file random.txt.