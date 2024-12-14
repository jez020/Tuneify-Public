import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


export const Slash = {
    name: "bugreport",
    globalCooldown: 1 * 60 * 60 * 1000,
    description: "Report a bug with the bot developers!",
    run: async (interaction) => {
        const modal = new ModalBuilder()
          .setCustomId('bugModal')
          .setTitle('Report a Bug');

        const featureInput = new TextInputBuilder()
          .setCustomId('featureInput')
          .setLabel("Please name the feature in question.")
          .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel("Please briefly describe the issue.")
            .setStyle(TextInputStyle.Paragraph);

        const reproductionInput = new TextInputBuilder()
            .setCustomId('reproductionInput')
            .setLabel("How can we reproduce the issue?")
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(featureInput);
        const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(reproductionInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
        await interaction.showModal(modal);
    }
}; // Call an example modal on execution.
