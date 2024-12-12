import fetch from "node-fetch";
import { spotifyAuthToken } from "../../utils/spotify.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, Embed, EmbedBuilder, TextInputStyle } from "discord.js";
import { SPOTIFY_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from "../../config.js";
import JSONdb from "simple-json-db";
import path from "path"
import { fileURLToPath } from "url";
import querystring from "querystring"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const Slash = {
    name: "link-spotify",
    // globalCooldown: 1 * 60 * 60 * 1000,
    description: "Get the now playing song on spotify!",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    run: async (interaction, client) => {
        let spotifyDB = new JSONdb(path.join(__dirname, "../../../spotifyDB.json"));

        let spotifyTempDB = new JSONdb(path.join(__dirname, "../../../spotifyTempDB.json"));
        if(spotifyDB.has(interaction.user.id)){
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Account Already Linked!")
                .setDescription(`You have already linked your spotify account! Click the botton below to disconnect, or ignore this message to continue using my services!`)
            let cancelButton = new ButtonBuilder()
                .setCustomId("disconnectSpotify")
                .setLabel("Disconnect Spotify from my Account")
                .setStyle(ButtonStyle.Danger)
            let actionRow = new ActionRowBuilder().addComponents(cancelButton)
            return await interaction.reply({ embeds: [embed], components: [actionRow], ephemeral: false })
        }

        let randomId = makeid(16)
        spotifyTempDB.set(randomId, interaction.user.id)
        
        const button = new ButtonBuilder()
            .setLabel("Complete Account Linking Now.")
            .setURL('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                show_dialog: true,
                response_type: 'code',
                client_id: SPOTIFY_ID,
                scope: SPOTIFY_SCOPES,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                state: randomId
        }))
			.setStyle(ButtonStyle.Link);

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Linking your Spotify Account!")
            .setDescription(`Please click the button below to link your spotify account!`)

        
		const buttons = new ActionRowBuilder()
        .addComponents(button);
        await interaction.reply({
            embeds: [embed],
            components: [buttons],
            ephemeral: true
        })
    }
}; // Simple /Ping command
