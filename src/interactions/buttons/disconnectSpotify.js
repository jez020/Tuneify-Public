
import { ButtonInteraction, EmbedBuilder } from "discord.js";
import path from "path"
import JSONdb from "simple-json-db";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Button = {
    name: "disconnectSpotify",
    ownerOnly: true,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    run: async (interaction) => {
        let spotifyDB = new JSONdb(path.join(__dirname, "../../../spotifyDB.json"));
        spotifyDB.delete(interaction.user.id)
        let embed = new EmbedBuilder()
            .setTitle("Your Spotify Account has been removed from our database!")
            .setDescription("Although we now have no access to your Spotify's API tokens, we suggest you to manually remove \"Tune Bot\" inside your spotify connections page to complete the disconnections.")
            .setColor("Green")
        await interaction.channel.send({ embeds: [embed], components: [], ephemeral: false })
    }
}; // ButtonCommand of the deleteOutput button.