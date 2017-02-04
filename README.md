# LIRI NODE APP

##LIRI is a command line node app that allows users to choose what type of data they wish to search for and what to information to search under each category.  It returns the information to the console and also stores the data in the log.txt file 


#### Categories users can search from 
- **Twitter**
	* This allows the user to access the latest 20 tweets from my [Twitter]
- **Spotify**
	* This allows the user to search for a song and access information about that song from Spotify
- **OMDB**
	* This allows the user to search for a movie title and return specific IMDB information about that movie
- **Colors**
* This allows color and style in your node.js console

Inside of the folder in which you've cloned the files to, run the following command:
```
npm install
```

## Running the application

Grab tweets from Twitter: `node liri my-tweets`

Search a song on Spotify: `node liri spotify-this-song [song]`

Get information about a movie: `node liri movie-this [movie]`

Run any commands you have run in the past: `node liri do-what-it-says`


All commands are logged to the `random.txt` file.


## Built With

* [Node.JS](https://nodejs.org/en/) - The backend this application is built on
* [Twitter](http://www.twitter.com) - Cannot have tweets without twitter :smile:
* [Spotify](http://www.spotify.com) - Used to get song information
* [OMDb API](https://www.omdbapi.com/) - Used to get movie information



## License

This project is licensed under the MIT License

