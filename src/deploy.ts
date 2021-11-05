// Copyright (c) 2021-2021 Dhairy Srivastava. All rights reserved. MIT license.

import { REST } from "@discordjs/rest";
import fs from "fs";
import { Routes } from "discord-api-types/v9";
import mainConfig from "./configs/main.config.json";

/** The file where the token is stored */
import { token } from "./token";


export default function deploy() {
  const commands = [];
  const rest = new REST({ version: "9" }).setToken(token);
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts"));

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
