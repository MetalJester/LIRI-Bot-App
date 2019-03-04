// // Bands in town API and "concert-this" command
// var axios = require("axios");

// var artist = process.argv[2];

// // var command = process.argv[2];

// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
// console.log(queryURL);

// axios.get(queryURL).then(
//     function(response) {
//       console.log(JSON.stringify("Venue Name: " + response.venue));
//     }
//   );

require('dotenv').config();

//Global variables
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var liriCommand = process.argv[2];
var userChoice = process.argv.slice(3).join(" ");

//switches for various commands
switch (liriCommand) {
    case "movie-this":
    movieThis();
    break;

    // case "spotify-this-song":
    // spotifyThis();
    // break;
}

// spotify-this-song function
function spotifyThis () {

    if (!userChoice) {
        userChoice = "The Sign";
    }

}


//movie-this function for the OMDB API;
function movieThis () {
    
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
}

