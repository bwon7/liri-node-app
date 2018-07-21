var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");
//console.log(keys);
var nodeArgv = process.argv;
var line = process.argv[2];

var name = " ";
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

function runapp() {
    //console.log(line);
    if (line === "my-tweets") {
    tweets();
}
else if (line === "spotify-this-song") {
 
    songShow(name);
}
else if (line === "movie-this") {
    movieShow();
}
else if (line === "do-what-it-says") {
    dowhat();
}
} 
runapp();

function tweets() {
    var params = { screen_name: 'infantlion' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log("ERROR");
        }
        for(var i=0; i < tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }
        
    });
    
}
function songShow() {
    for (var i = 3; i < nodeArgv.length; i++) {
       
        name = name + " " + nodeArgv[i];
    
}
console.log(name);
    spotify.search({ type: "track", query: name }, function (err, data) {
        if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);

            }
        }
        else {
            console.log(err);
        }
    })

}
function movieShow() {
    for (var i = 3; i < nodeArgv.length; i++) {
        
            name = name + "+" + nodeArgv[i];
        
        
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&plot=short&apikey=trilogy";

    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Yesr: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoURL);
            console.log("Language of movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Acotrs in the movie: " + JSON.parse(body).Actors);
        }
        else {
            console.log("Error!");
        }

    });
}
function dowhat() {
    //console.log("Check");
    fs.readFile("random.txt", "utf8", function (err, data) {
        //console.log("Check");
        if (err) {
            return console.log(err);
        }
        var memo = data.split(",");
        line = memo[0];
        name = memo[1];
        //console.log(data);
        runapp();
    });
}