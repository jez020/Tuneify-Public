import express from 'express'
import bodyParser from 'body-parser'
import JSONdb from 'simple-json-db'
import querystring from 'querystring'
import path from 'path'
import { fileURLToPath, URLSearchParams } from 'url'
import { SPOTIFY_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES, SPOTIFY_SECRET } from './src/config.js'
const app = express()
app.use(bodyParser.json())
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let redirect_uri = SPOTIFY_REDIRECT_URI


app.get('/spotify/callback', async (req, res) => {
    let spotifyTempDB = new JSONdb("./spotifyTempDB.json")
    if(req.query.error)return res.status(400).send("You either did not allow access or an error occured. Please try again later.")
    if(req.query.code == undefined){
        var state = req.query.state;
        if(state == undefined)return res.status(400).send("Invalid parameter 'state'")
        if(spotifyTempDB.has(state) == false)return res.status(400).send("Invalid parameter 'state'")
        var scope = SPOTIFY_SCOPES;

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                show_dialog: true,
                response_type: 'code',
                client_id: SPOTIFY_ID,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
        }));
    }else{
        var code = req.query.code || null;
        var state = req.query.state || null;

        if (state === null) {
            res.status(400).send("Something went wrong, please try again.")
        } else {
            var authOptions = {
                method: "post",
                body: new URLSearchParams({
                    code: code,
                    redirect_uri: SPOTIFY_REDIRECT_URI,
                    grant_type: 'authorization_code'
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(SPOTIFY_ID + ':' + SPOTIFY_SECRET).toString('base64'))
                },
                json: true
            };
            let data = await (await fetch('https://accounts.spotify.com/api/token', authOptions)).json()
            if(data.error != undefined)return res.status(400).send("Something went wrong, try again later.");
            data["expires_at"] = (parseInt(data["expires_in"]) * 1000) + Date.now()
            let spotifyDB = new JSONdb("./spotifyDB.json")
            spotifyDB.set(spotifyTempDB.get(state), data)
            spotifyTempDB.delete(state)
            res.status(200).send("Your account has been linked!")
        }
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})