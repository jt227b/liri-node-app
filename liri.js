require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var readline = require("readline")
var rl = readline.createInterface(process.stdin, process.stdout);
var fs = require("fs");


// Function // // Function // // Function // // Function // // Function // // Function //
function runSearch(type, search) {
    switch (type) {
        case "c":
            concerts(search);
            break;

        case "s":
            songs(search);
            break;

        case "m":
            movies(search);
            break;

        case "concert-this":
            concerts(search);
            break;

        case "spotify-this-song":
            songs(search);
            break;

        case "movie-this":
            movies(search);
            break;

    }
}

// Object // // Object // // Object // // Object // // Object // // Object // // Object //                   
var userInput = {
    type: "",
    search: [],
};

// Prompt for Requested Search // // Prompt for Requested Search // // Prompt for Requested Search //
var firstPrompt = `\nWhat would you like to search?
                    \nEnter LETTER or term for ONE of the options below:
                    \nc - concert-this,
                    \ns - spotify-this-song,
                    \nm - movie-this,
                    \nr - do-what-I-say\n\n`;


// Function // // Function // // Function // // Function // // Function // // Function //
rl.question(firstPrompt, function (firstAnswer) {
    userInput.type = firstAnswer.trim();

    if (userInput.type === "r" || userInput.type === "do-what-I-say") {
        rl.close();
        fileContent();

    }

    else {
        if (userInput.type === "c" || userInput.type === "concert-this") {
            rl.setPrompt("\nPlease enter name of an artist or a band\n\n");
        }

        else if (userInput.type === "s" || userInput.type === "spotify-this-song") {
            rl.setPrompt("\nPlease enter name of a song\n\n");
        }

        else if (userInput.type === "m" || userInput.type === "movie-this") {
            rl.setPrompt("\nPlease enter name of a movie\n\n");
        }

        rl.prompt();

        rl.on("line", function (secondAnswer) {
            userInput.search.push(secondAnswer.trim());
            runSearch(userInput.type, userInput.search[0]);
            rl.close();
        });
    }
});


// BandsInTown // // Function // // BandsInTown // // Function // // BandsInTown // // Function // // BandsInTown //
var codingBC = "codingbootcamp"

function concerts(artist) {
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${codingBC}`)
        .then(function (response) {
            var r = response.data;

            for (var i = 0; i < r.length; i++) {
                if (r[i].venue.country === "United States") {
                    console.log(`\n${i + 1}- ${r[i].venue.country}`);
                    console.log(`-----------------------------------`);
                    console.log(`Venue Name: ${r[i].venue.name}`);
                    console.log(`Venue Location: ${r[i].venue.city}, ${r[i].venue.region}`);
                    console.log(`Event Date: ${moment(r[i].datetime).format('L')}`);

                } else if (r[i].venue.country !== "United States") {
                    console.log(`\n${i + 1}- ${r[i].venue.country}`);
                    console.log(`------------------------------------`);
                    console.log(`Venue Name: ${r[i].venue.name}`);
                    console.log(`Venue Location: ${r[i].venue.city}`);
                    console.log(`Event Date: ${moment(r[i].datetime).format('L')}`);
                }
            }
        });
}


// Spotify // // Function // // Spotify // // Function // // Spotify // // Function // // Spotify // 
function songs(song) {

    (song === "") ? song = "The Sign" : song;

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            console.log(err);
        }

        var d = data.tracks.items[0];
        console.log(`\n---------------------------------`);
        console.log(`Artist: ${d.artists[0].name}`);
        console.log(`Song: ${song.charAt(0).toUpperCase() + song.slice(1)}`);
        console.log(`Preview Link: ${d.preview_url}`);
        console.log(`Album: ${d.album.name}`);
        console.log(`----------------------------------`);

    });
}

// OMDB // // Function // // OMDB // // Function // // OMDB // // Function // // OMDB //
function movies(movie) {

    (movie === "") ? movie = "Mr.Nobody" : movie;

    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
            var r = response.data;

            function movieContent() {
                console.log(`\nMovie Title: ${r.Title}`);
                console.log(`=================================`);
                console.log(`Year Released: ${r.Year}`);
                console.log(`Movie Cast: ${r.Actors}`);
                console.log(`---------------------------------`);
                console.log(`IMDB Rating: ${r.Ratings[0].Value}`);
                console.log(`Rotten Tomatoes Rating: ${r.Ratings[1].Value}`);
                console.log(`---------------------------------"`);
                console.log(`Country of Production: ${r.Country}`);
                console.log(`Movie Language: ${r.Language}`);
                console.log(`---------------------------------`);
                console.log(`Movie Plot: ${r.Plot}`);
            }

            if (movie !== "Mr.Nobody") {
                movieContent();

            }

            else {
                console.log(`--------------------------------`);
                console.log(`You forgot to enter a movie name.`);
                console.log(`If you haven't watched 'Mr. Nobody', then you should: https://www.imdb.com/title/tt0485947/.`);
                console.log(`It's on Netflix.`);
                console.log(`---------------------------------`);
                movieContent();
            }
        });
}


// Function // // Function // // Function // // Function // // Function // // Function //

function fileContent() {

    fs.readFile("random.txt", "utf8", function (error, content) {
        if (error) {
            return (error);
        }
        var contentArr = content.split(",");
        runSearch(contentArr[0].trim(), contentArr[1].trim());
    });
}