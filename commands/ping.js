const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Veja o ping do bot!"),
    async execute(interaction) {
        await interaction.reply("Pong!")
    }
}