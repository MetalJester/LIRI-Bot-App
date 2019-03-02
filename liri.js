// require('dotenv').config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

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

// OMDB API and movie-this

var axios = require("axios");

var nodeArgs = process.argv;

var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    }
    else {
        movieName += nodeArgs[i];
    }
}

var moveieQueryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(moveieQueryURL);

axios.get(moveieQueryURL).then(
    function (response) {
        console.log(`Title of the movie: ${response.data.Title}\n`,
            `IMDB Rating of the movie: ${response.data.imdbRating}\n`,
            `Year the movie came out: ${response.data.Year}\n`,
            `Rotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}\n`,
            `Country where the movie was produced: ${response.data.Country}\n`,
            `Language of the movie: ${response.data.Language}\n`,
            `Plot of the movie: ${response.data.Plot}\n`,
            `Actors in the movie: ${response.data.Actors}\n`)

  }
);