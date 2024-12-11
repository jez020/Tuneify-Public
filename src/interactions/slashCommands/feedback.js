import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const Slash = {
    name: "feedback",
    description: "Send the bot owners feedback!",
    run: async (interaction) => {
        const modal = new ModalBuilder()
          .setCustomId('feedbackModal')
          .setTitle('Send us Feedbacks!');

        const feedbackInput = new TextInputBuilder()
          .setCustomId('feedbackInput')
          .setLabel("Please tell us how we could improve the bot!")
          .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(feedbackInput);

        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    }
}; // Call an example modal on execution.
