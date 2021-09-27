import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import mainConfig from "../configs/main.config.json";
import { green } from 'chalk';

const commands: string[] = [];
const commandFiles = fs.readdirSync('./src/commands').filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest: REST = new REST({ version: "9" }).setToken(mainConfig.SECRETS.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      mainConfig.GENERAL.CLIENTID,
      mainConfig.GENERAL.GUILDID
    ),
    { body: commands }
  )
  .then(() => console.log(green("Successfully registered application commands.")))
  .catch(console.error);
