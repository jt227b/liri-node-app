require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");


var input = process.argv.slice(2).join(" ");
var type = input[0];

// loop // // loop // // loop // // loop // // loop // // loop // // loop //
var search = "";
for (var i = 1; i < input.length; i++) {
    (i > 1 && i < input.length) ? search = search + input[i]
        : (i = 1) ? search = input[1].trim()
            : "Please enter artist or movie name";
}
console.log(type);
console.log(search);


// Conditions // // Conditions // // Conditions // // Conditions // // Conditions //

switch (type) {
    // concert-this //
    case "c":
        concerts(search);
        break;

    // spotify-this-song //
    case "s":
        songs(search);
        break;

    // movie-this //
    case "m":
        movies(search);
        break;

    // do-what-it-says //
    case "r":
        fileText(search);
        break;
}


// Bands In Town // // Bands In Town // // Bands In Town // // Bands In Town // // Bands In Town //
var codingBC = "codingbootcamp"

function concerts(artist) {
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${codingBC}`)
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].venue.country === "United States") {
                    console.log(`\nLocation ${i + 1}- In the United States`);
                    console.log("-----------------------------------------")
                    console.log(`Venue Name: ${results[i].venue.name}`);
                    console.log(`Venue Location: ${results[i].venue.city}, ${results[i].venue.region}`);
                    console.log(`Event Date: ${moment(results[i].datetime).format('L')}`);

                } else if (results[i].venue.country !== "") {
                    console.log(`\nLocation ${i + 1}- Outside the United States`);
                    console.log("-----------------------------------------")
                    console.log(`Venue Name: ${results[i].venue.name}`);
                    console.log(`Venue Location: ${results[i].venue.city}, ${results[i].venue.country}`);
                    console.log(`Event Date: ${moment(results[i].datetime).format('L')}`);
                }
            }
        });
}




// Spotify // // Spotify // // Spotify // // Spotify // // Spotify // // Spotify //

// function songs(song) {
//     var spotify = new Spotify(keys.spotify);
//     spotify.search({
//         type: 'track',
//         query: song,
//         limit: 1
//     },
//         function (err, data) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log(data);
//             console.log(JSON.stringify(data));
//         });
// }


// IMDB // // IMDB // // IMDB // // IMDB // // IMDB // // IMDB // // IMDB //

function movies(movie) {

    (movie === "") ? movie = "Mr.Nobody" : movie;

    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
            var results = response.data;
            console.log("\nYou forgot to enter a movie name.");
            console.log("If you haven't watched 'Mr. Nobody', then you should: https://www.imdb.com/title/tt0485947/.");
            console.log("It's on Netflix");

            console.log(`\nMovie Title: ${results.Title}`);
            console.log(`Year Released: ${results.Year}`);
            console.log(`IMDB Rating: ${results.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${results.Ratings[1].Value}`);
            console.log(`Country of Production: ${results.Country}`);
            console.log(`Movie Language: ${results.Language}`);
            console.log(`Movie Plot: ${results.Plot}`);
            console.log(`Movie Cast: ${results.Actors}`);
        });
}



function fileText() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });


}
