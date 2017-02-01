// enable node fs to read/write to .txt files
var fs = require("fs");
// enable twitter/spotify/request node packages
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var colors = require('colors')

// var to hold location of required file
var keyFile = require("./keys.js");
// var to hold path to twitter keys
var tKeys = keyFile.twitterKeys;

// var to hold command to perform
var command = process.argv[2];

// var for request
var userRequest;
// var to hold inputs if request is more than one word
var requestArray = [];

// statement to check if proper arguments passed into terminal
if (command == "my-tweets" || command == "spotify-this-song" ||
    command == "movie-this" || command == "do-what-it-says") {
    log("log.txt", command);
} else {
    console.log("Invalid command.");
    log("error.txt", command);
    return;
};

// if statement for process.argv with length of 4
if (process.argv.length == 4) {
    userRequest = process.argv[3];
}
else {
    for (var i = 3; i < process.argv.length; i++) {
        requestArray.push(process.argv[i]);
    };
    userRequest = requestArray.join(" ");
};

if (command == "my-tweets") {
    // var to get twitter keys from path
    var client = new twitter({
        consumer_key: tKeys.consumer_key,
        consumer_secret: tKeys.consumer_secret,
        access_token_key: tKeys.access_token_key,
        access_token_secret: tKeys.access_token_secret
    });

    client.get("statuses/user_timeline", function(err, tweets) {
        if (!err) {
            for (var tweet = 0; tweet < tweets.length; tweet++) {
                console.log(tweets[tweet].text.blue);
            };
        } else {
            throw err;
        };
    });
}

if (command == "spotify-this-song") {
    if (userRequest == "") {
        userRequest = "The Sign";
        songInfo(userRequest);
    } else {
        songInfo(userRequest);
    };
};

if (command == "movie-this") {
    // initialize var to hold omdbURL
    var omdbURL;

    if (userRequest == "") {
        omdbURL = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&tomatoes=true&r=json";
        movieInfo(omdbURL);
    } else {
        omdbURL = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&tomatoes=true&r=json";
        movieInfo(omdbURL);
    };
};

if (command == "do-what-it-says") {
    fs.readFile("random.txt", "UTF8", function (err, data) {
        if (err) {
            console.log(err);
            log("error.txt", command + "Error: " + err);
            return;
        }
        randomArray = data.split(",");
        userRequest = randomArray[1];
        songInfo(userRequest);
    });
};

// function to log commands to appropriate txt files
function log(file, command) {
    fs.appendFile(file, command + ", ", function(err) {
        if (err) {
            console.log(err);
            log("error.txt", "Logging " + command + " Error: " + err);
            return;
        };
    });
};

// function to retrieve song info
function songInfo(songName) {
    console.log("\n".green);
    console.log("The Song Name: ".green + songName.toUpperCase().green);
    console.log("\n".green);
    spotify.search({type: "track", query: songName}, function(err, data) {
        if (err) {
            console.log("Error: " + err);
            log("error.txt", command + " Error: " + err);
            return;
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("--------------------------------------------------------------------".green);
                console.log("Search Results: #".magenta + i)
                console.log("Artist: ".magenta + data.tracks.items[i].artists[0].name.green);
                console.log("Song Name: ".magenta + data.tracks.items[i].name.green);
                console.log("Album: ".magenta + data.tracks.items[i].album.name.green);
                console.log("Preview Link: ".magenta + data.tracks.items[i].external_urls.spotify.green + "\n".green);
            };
        };
    });
};

// function to retreive movie info
function movieInfo(movieURL) {
    request(movieURL, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            //convert body to string
            body = JSON.parse(body);
            console.log("\n".red);
            console.log("Title: ".blue + body.Title.red);
            console.log("Year: ".blue + body.Year.red);
            console.log("Rating: ".blue + body.Rated.red);
            console.log("Country: ".blue + body.Country.red);
            console.log("Language: ".blue + body.Language.red);
            console.log("Plot: ".blue + body.Plot.red);
            console.log("Cast: ".blue + body.Actors.red);
            console.log("Rotten Tomatoes Rating: ".blue + body.tomatoRating.red);
            console.log("Rotten Tomatoes URL: ".blue + body.tomatoURL.red);
            console.log("\n");
        } else {
            log("error.txt", command + " Error: " + err);
            return;
        };
    });
};