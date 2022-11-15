const { Client, Collection, Events, GatewayIntentBits } = require("discord.js")
const { token } = require("./config.json")
const fs = require("node:fs")
const path = require("node:path")

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`ERRO: o comando como ${filePath} está faltando uma propriedade DATA ou EXECUTE obrigatoria.`)
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if(!command) {
        console.error(`Nenhum comando correspondente com ${interaction.commandName} foi achado.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply ({ content: "Ocorreu um erro ao executar esse comando!", ephemeral: true})
    }
})

client.once(Events.ClientReady, c => {
    console.log(`O bot está online em ${c.user.tag}`)
})

client.login(token)