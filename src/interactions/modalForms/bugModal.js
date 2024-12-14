import { EmbedBuilder, ModalSubmitInteraction, WebhookClient } from "discord.js";

export const Modal = {
    name: "bugModal",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: (interaction) => {
        let title = interaction.fields.getTextInputValue('featureInput');
        let description = interaction.fields.getTextInputValue('descriptionInput');
        let reproduction = interaction.fields.getTextInputValue('reproductionInput');
        let serverEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("New Bug Report")
            .addFields([
                {
                    name: "Bug Feature",
                    value: title
                },{
                    name: "Bug Description",
                    value: description
                },{
                    name: "Steps to Reproduce",
                    value: reproduction
                }
            ])
            .setFooter({ text: `User: ${interaction.user.id}` })
        let userEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Feedback Submitted")
            .addFields([
                {
                    name: "Bug Feature",
                    value: title
                },{
                    name: "Bug Description",
                    value: description
                },{
                    name: "Steps to Reproduce",
                    value: reproduction
                }
            ])
            .setFooter({ text: "Thank you for submitting!" })

        let webhook = new WebhookClient({ id: '1317312412684390420', token: 'a-NjeY4MeUWwPxC1nTUM1JrjcRQ3Cqs0sUtXaVOTR3o8M9PoC3MWhAiKUbyzs4wpm9LG' });
        webhook.send({
            embeds: [serverEmbed],
            username: "Tuneify Bugs"
        })
        interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });
    }
}; // Code for the ExampleModal ModalForm