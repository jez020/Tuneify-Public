import fetch from "node-fetch";
import { SPOTIFY_ID, SPOTIFY_SECRET } from "../config.js";
import JSONdb from "simple-json-db";
import { User } from "discord.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const spotifyPlayback = async (access_token) => {
                               
    let data = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            'Authorization': access_token
        }
    });

    return data
}

export const spotifyAuthToken = async (user, interaction) => {
    let result = await spotifyCheckToken(user, interaction)
    if(result == false){
        interaction.reply("Please use /link-spotify to link your Spotify account!")
        return false
    }else{
        return result
    }
};
/**
 * 
 * @param {User} user 
 */
export const spotifyCheckToken = async (user, interaction) => {

    let spotifyDB = new JSONdb(path.join(__dirname, "../../spotifyDB.json"));

    if(spotifyDB.has(user.id) == false)return false;

    let spotifyUser = spotifyDB.get(user.id)
    if(Date.now() - spotifyUser["expires_at"] >= 0){
        spotifyUser = await refreshToken(user.id, spotifyUser["refresh_token"])
    }

    return `${spotifyUser['token_type']} ${spotifyUser['access_token']}`
}

const refreshToken = async (userid, refresh_token) => {

    let spotifyDB = new JSONdb(path.join(__dirname, "../../spotifyDB.json"));
    console.log("Refreshing token!")
    // refresh token that has been previously stored
    const url = "https://accounts.spotify.com/api/token";
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + (new Buffer.from(SPOTIFY_ID + ':' + SPOTIFY_SECRET).toString('base64'))
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refresh_token,
         client_id: SPOTIFY_ID
       }),
     }
     const body = await fetch(url, payload);
     const data = await body.json();
     data["expires_at"] = (parseInt(data["expires_in"]) * 1000) + Date.now()
     data["refresh_token"] = refresh_token
     spotifyDB.set(userid, data)
     return data;
   }