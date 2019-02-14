let fetch = require ('node-fetch');

console.log("[JSSpotifyAPISearch] Set global parameters");

// Set global parameters

// "I am the champion" query song
const songName = "I%20am%20the%20champion";

// Set APIs URL parameters
const getTokenUrl = 'https://accounts.spotify.com/api/token';
const getTrackUrl = 'https://api.spotify.com/v1/search?q='+songName+'&type=track';


// Convert client id and client secret code in base64 to be used for getting token from Spotify server
const basic64ClientIdAndClientSecret= 'NzM0NjVlYTRhZDAwNGM2MzhmMTE5OGYxM2VjNWNhZWQ6ZDQ4MzM3ODM1OWY3NGZiYzhhOGRlOTI1NDE5NGQ1NjI'; // my own client ID and secret code

// Set http request header , method and body params for http post for getting token
const otherParams = {
    headers:{"content-type":"application/x-www-form-urlencoded", "Authorization":"Basic "+basic64ClientIdAndClientSecret},
    body: 'grant_type=client_credentials',
    method:'post'
};

// Get token with previously Base64 encoded client Id and secret code
console.log("[JSSpotifyAPISearch] Get registered application token");

fetch(getTokenUrl, otherParams).then(response => response.json()).then(function(data) {
    // On promise, set http request header and method params for http get for searching song
    const otherParams = {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + data.access_token
        },
        method: 'get'
    };


    let status;
    fetch(getTrackUrl, otherParams).then(response => {
        if (!response.ok) {
            throw Error("[JSSpotifyAPISearch] ERROR : " + response.statusText);
        }

        if (response.status === 200 ) { // Add more status code validations
            console.log("[JSSpotifyAPISearch] Search song [OK]");
            return response.json()
        }  else {
            throw Error("[JSSpotifyAPISearch]Error while retrieving song. Error code: " + response.status)
        }

    }).then(data => {
        console.log("[JSSpotifyAPISearch] Response returned by Spotify server for this search is : " + JSON.stringify(data));
    }).catch((err) => {
        console.error("Retrieving track results error: " + err );
    });

});















