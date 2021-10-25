// Copyright (c) 2021-2021 Dhairy Srivastava. All rights reserved. MIT license.

const { REST } = require("@discordjs/rest");
const fs = require("fs");
const { Routes } = require("discord-api-types/v9");
const mainConfig = require("./configs/main.config.json");

/** The file where the token is stored */
const { token } = require("./token.js");


module.exports = function deploy() {
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
