require("dotenv").config();

var fs = require("fs");
var api = require("./api.js");
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotifyThis = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var command = process.argv[2];
var search = "";



switch (command) {
    case "concert-this":
        callConcert();
        break;
    case "spotify-this-song":
        callSpotify();
        break;
    case "movie-this":
        callMovie();
        break;
    case "do-what-it-says":
        callRandom();
        break;

}

function callMovie() {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            
          search = search + "+" + nodeArgs[i];
      
        }
      
        else {
      
          search += nodeArgs[i];
      
        }
      }
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(queryUrl);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released in: " + JSON.parse(body).Year);
            console.log("Rating(imdb): " + JSON.parse(body).imdbRating);
            console.log("Rating(RotTom): " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);


        }
    })
}

function callConcert () {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            
          search = search + nodeArgs[i];
      
        }
      
        else {
      
          search += nodeArgs[i];
      
        }
      }
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
    request(queryUrl, function(error, response, body) {
        console.log(queryUrl);
        var dateTime = JSON.parse(body);
        var date = moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY");
        
        
        if (!error && response.statusCode === 200) {
            //console.log(queryUrl);
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country);
            console.log("Event Date: " + date);

        }
    })
}

function callSpotify() {
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            
          search = search + nodeArgs[i];
      
        }
      
        else {
      
          search += nodeArgs[i];
      
        }
      }
    spotifyThis.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
        }
       var artist = data.tracks.items[0].artists[0].name;
       var songName = data.tracks.items[0].name;
       var album = data.tracks.items[0].album.name;
       var preview = data.tracks.items[0].preview_url;

       if (artist === undefined) {
           return "null";
       }
       if (songName === undefined) {
           return "null";
       }
       if (album === undefined) {
           return "null";
       }
       if (preview === undefined) {
           return "null";
       }

    
      console.log(JSON.stringify("Artist: " + artist, null, 2)); 
      console.log(JSON.stringify("Song: " + songName, null, 2));
      console.log(JSON.stringify("Album: " + album, null, 2)); 
      console.log(JSON.stringify("Preview: " + preview, null, 2));

      })
}
function callRandom() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
    JSON.stringify(data) = process.argv[2];
})
}
