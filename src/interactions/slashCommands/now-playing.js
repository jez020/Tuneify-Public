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
      let embed = new EmbedBuilder()
        .setTitle("Now Playing | " + np.item.name)
        .setURL(np.item.external_urls.spotify)
        .setThumbnail(np.item.album.images[0].url)
        .setFields([
          {
            name: "Artist",
            value: `[${np.item.artists[0].name}](${np.item.artists[0].external_urls.spotify})`,
            inline: true
          },
          {
            name: "\u200B",
            value: "\u200B",
            inline: true
          },
          {
            name: "Album",
            value: `[${np.item.album.name}](${np.item.album.external_urls.spotify})`,
            inline: true
          },
          {
            name: "Context",
            value: `[${np.context.type}](${np.context.external_urls.spotify})`,
            inline: true
          },
          {
            name: "\u200B",
            value: "\u200B",
            inline: true
          },
          {
            name: "Playback Device Type",
            value: np.device.type,
            inline: true
          }
        ])
        .setColor("Green")
        .setFooter({ text: `${np["shuffle_state"] ? (np["smart_shuffle"] ? "Smart Shuffle" : "Shuffling") : "Not Shuffling"} | Repeating ${np["repeat_state"] == "off" ? "Off" : (np["repeat_state"] == "context" ? "On" : "Current Track")} | ${np["is_playing"] ? "Currently Playing" : "Paused/Recently Played"}` })

      interaction.reply({ embeds: [embed] })
    }
}; // Simple /Ping command
