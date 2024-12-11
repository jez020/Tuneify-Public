import { EmbedBuilder, ModalSubmitInteraction, WebhookClient } from "discord.js";



let userObj = [];

setInterval(() => {
    userObj = [];
}, 1 * 60 * 60 * 1000)

export const Modal = {
    name: "feedbackModal",
    /**
     * 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: (interaction) => {
        if(userObj.includes(interaction.user.id))return interaction.reply({ content: "Please try again later, you already responded recently!", ephemeral: true })
        let reply = interaction.fields.getTextInputValue('feedbackInput');
        let serverEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("New Feedback")
            .setDescription(reply)
            .setFooter({ text: `User: ${interaction.user.id}` })
        let userEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Feedback Submitted")
            .setDescription(reply)
            .setFooter({ text: "Thank you for submitting!" })

        let webhook = new WebhookClient({ id: '1316238369919074314', token: '_mjf-GgROuEKNzIunB9dS-KlkAmaNShOydJAEjm5sgaBf6UMqgO62aYNGL1FkbNQFLYo' });
        webhook.send({
            embeds: [serverEmbed],
            username: "Tuneify Feedbacks"
        })
        interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });
        userObj.push(interaction.user.id)
    }
}; // Code for the ExampleModal ModalForm