import fetch from "node-fetch";
import { spotifyAuthToken, spotifyCheckToken, spotifyPlayback } from "../../utils/spotify.js";
import { EmbedBuilder } from "discord.js";

export const Slash = {
    name: "now-playing",
    guildCooldown: 0 * 1000,
    description: "Get the now playing song on spotify!",
    run: async (interaction, client) => {
      let token = await spotifyAuthToken(interaction.user, interaction)
      let np = (await spotifyPlayback(token))
      if(np.status == 204)return interaction.reply("This user is not currently listening to anything!")
      np = await np.json()
      let embed = new EmbedBuilder()
        .setTitle("Now Playing | " + np.item.name)
        .setURL(np.item.external_urls.spotify)
        .setThumbnail(np.item.album.images[0].url)
        .setFields([
          {
            name: "track",
            value: np.item.name,
            inline: true
          },{
            name: "artist",
            value: np.item.artists[0].name,
            inline: true
          }
        ])
        .setColor("Green")

      interaction.reply({ embeds: [embed] })
    }
}; // Simple /Ping command
