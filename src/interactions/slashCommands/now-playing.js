import fetch from "node-fetch";
import { spotifyAuthToken, spotifyCheckToken, spotifyPlayback } from "../../utils/spotify.js";
import { EmbedBuilder } from "discord.js";

export const Slash = {
    name: "now-playing",
    guildCooldown: 15 * 1000,
    description: "Get the now playing song on spotify!",
    run: async (interaction, client) => {
      let token = await spotifyAuthToken(interaction.user, interaction)
      if(token == false)return;
      let np = (await spotifyPlayback(token))
      if(np.status == 204)return interaction.reply("This user is not currently listening to anything!")
      np = await np.json()
    console.log(np)
      let embed = new EmbedBuilder()
        .setTitle("Now Playing | " + np.item.name)
        .setURL(np.item.external_urls.spotify)
        .setThumbnail(np.item.album.images[0].url)
        .setFields([
          {
            name: "Track",
            value: np.item.name,
            inline: true
          },{
            name: "Artist",
            value: np.item.artists[0].name,
            inline: true
          },{
            name: "Album",
            value: np.item.album.name,
            inline: true
          },{
            name: "Playing Mode",
            value: `${np["shuffle_state"] ? (np["smart_shuffle"] ? "Smart Shuffle" : "Shuffling") : "Not Shuffling"} | Repeating ${np["repeat_state"] == "off" ? "Off" : (np["repeat_state"] == "context" ? "On" : "Current Track")}`,
            inline: true
          }
        ])
        .setColor("Green")
        .setFooter({ text: `Current Playback Status: ${np["is_playing"] ? "Currently Playing" : "Paused/Recently Played"}` })

      interaction.reply({ embeds: [embed] })
    }
}; // Simple /Ping command
