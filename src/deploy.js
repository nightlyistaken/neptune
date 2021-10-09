const { REST } = require("@discordjs/rest");
const fs = require("fs");
const { Routes } = require("discord-api-types/v9");
const { token } = require("./configs/token.json");
const mainConfig = require("./configs/main.config.json");
// const { ClientApplication } = require("discord.js");

module.exports = function deploy(client) {
  const commands = [];
  const rest = new REST({ version: "9" }).setToken(token);
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  rest
    .put(Routes.applicationCommands(mainConfig.GENERAL.CLIENTID), {
      body: commands,
    })
    .catch(console.error);
}
