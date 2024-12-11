import fetch from "node-fetch";
import { spotifyAuthToken } from "../../utils/spotify.js";
import { EmbedBuilder } from "discord.js";

export const Slash = {
    name: "now-playing",
    guildCooldown: 20 * 1000,
    description: "Get the now playing song on spotify!",
    run: async (interaction, client) => {
      let SpotifyAuth = (await spotifyAuthToken())

      let np = await (await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            'Authorization': 'Bearer ' + SpotifyAuth["access_token"]
        }
      })).json();

      console.log(np)

      let npEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Now Playing | " + "")
    }
}; // Simple /Ping command
