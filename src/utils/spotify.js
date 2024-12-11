import fetch from "node-fetch";
import { SPOTIFY_ID, SPOTIFY_SECRET } from "../config.js";


export const spotifyAuthToken = async (dir) => {
    let getToken = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': SPOTIFY_ID,
            'client_secret': SPOTIFY_SECRET
        })
    });

    return getToken.json()
};