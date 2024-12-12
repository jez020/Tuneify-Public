import { ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import { OWNER_IDS } from "../../config.js";


/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} message 
 * @param {SlashCommand} command 
 * @param {*} interactionType 
 * @returns 
 */
export const globalCooldownFN = async (client, message, command, interactionType) => {
    if (!command.globalCooldown || isNaN(command.globalCooldown)) return true;
    if (OWNER_IDS.includes(message.member.id))return true;

    const dbData = `globalCooldown.${interactionType}.${command.name}.${message.member.id}`;
    const currentTime = Date.now();
    const storedTime = client.cooldownDB?.get(dbData) ?? 0;

    if (Math.floor(currentTime - storedTime) >= command.globalCooldown || !storedTime) {
        client.cooldownDB?.set(dbData, currentTime);
        return true;
    }
    else {
        if (command.returnErrors === false || command.returnGlobalCooldownError === false) return false;
        message.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("DarkRed")
                .setTimestamp()
                .setAuthor({
                    name: message.member.user.globalName ?? message.member.user.username
                })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`You are currently at cooldown. Please try again in <t:${Math.floor(Math.floor(storedTime + command.globalCooldown) / 1000)}:R>.`)
            ],
            ephemeral: true
        });

        return false;
    };
};