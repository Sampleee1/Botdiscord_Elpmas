const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Fornece informação sobre o servidor."),
    async execute(interaction) {
        await interaction.reply(`Esse server é ${interaction.guild.name} e tem ${interaction.guild.memberCount} membros.`)
    },
}