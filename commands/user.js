const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Fornece informação sobre o usuario."),
    async execute(interaction) {
        await interaction.reply(`Esse comando foi executado por ${interaction.user.username}, que entrou como ${interaction.member.joinedAt}.`)
    },
}