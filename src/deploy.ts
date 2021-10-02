import { REST } from "@discordjs/rest";
import { cyanBright } from "chalk";
import fs from "fs";
import { Routes } from "discord-api-types/v9";

export default function deploy(mainConfig: any, botToken: any, client: any) {
  const commands: string[] = [];
  const rest: REST = new REST({ version: "9" }).setToken(botToken.token);
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file: string) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  rest
    .put(
      Routes.applicationGuildCommands(
        mainConfig.GENERAL.CLIENTID,
        mainConfig.GENERAL.GUILDID
      ),
      { body: commands }
    )
    .then(() =>
      console.log(cyanBright.bgBlack("Successfully registered application commands!"))
    )
    .catch(console.error);
}
