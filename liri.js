require('dotenv').config();

//Global variables
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var liriCommand = process.argv[2];
var userChoice = process.argv.slice(3).join(" ");

//switches for various commands
switch (liriCommand) {
    case "movie-this":
        movieThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "concert-this":
        concertThis();
        break;
}

// Bands in town API and "concert-this" command
function concertThis() {
    //if user doesn't add a choice then auto search for "Kiss"
    if (!userChoice) {
        userChoice = "Kiss";
    };

    var queryURL = "https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {

            if (response.data.length > 0) {
                for (var i = 0; i <response.data.length; i++) {
                    var concert = response.data[i];
                    var concertTime = moment(concert.datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A');
                    console.log(
                        `Venue: ${concert.venue.name}\n`,
                        `Location: ${concert.venue.city}, ${concert.venue.region}, ${concert.venue.country}\n`,
                        `Date: ${concertTime}\n`,
                        );
                        
                       
                }

            } else {
                console.log("No concerts found.");
            }
        }
    )


}


// spotify-this-song function
function spotifyThis() {

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    // if the user doesn't add a song then "The Sign" will autofill
    if (!userChoice) {
        userChoice = "The Sign";
    }

    spotify
        .search({ type: 'track', query: userChoice })
        .then(function (data) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 1; i++) {
                console.log(
                    `Artist(s): ${songInfo[i].artists[0].name}\n`,
                    `Song Title: ${songInfo[i].name}\n`,
                    `Preview spotify link: ${songInfo[i].preview_url}\n`,
                    `Album Title: ${songInfo[i].album.name}\n`)
            }
        })
        .catch(function (err) {
            console.log(err);
        });

};



//movie-this function for the OMDB API;
function movieThis() {

    // if the user doesn't add a movie name, then Mr. Nobody will be searched for as default
    if (!userChoice) {
        userChoice = "Mr. Nobody";
    }

    var movieQueryURL = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";

    axios.get(movieQueryURL).then(
        function (response) {
            console.log(
                `Title of the movie: ${response.data.Title}\n`,
                `IMDB Rating of the movie: ${response.data.imdbRating}\n`,
                `Year the movie came out: ${response.data.Year}\n`,
                `Rotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}\n`,
                `Country where the movie was produced: ${response.data.Country}\n`,
                `Language of the movie: ${response.data.Language}\n`,
                `Plot of the movie: ${response.data.Plot}\n`,
                `Actors in the movie: ${response.data.Actors}\n`)

        }
    );
};

