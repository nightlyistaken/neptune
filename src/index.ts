import { Interaction } from "discord.js";

import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
import mainConfig from "./configs/main.config.json";

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready to use! Issues? Report here!");
  console.log("https://github.com/dhairy-online/nevagon/issues/new");

  client.user?.setActivity(`Listening to '/' commands | Online`, {
    name: "nevagon",
    type: "STREAMING",
    url: "https://www.twitch.tv/breadoonline",
  });
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command: any = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log("Interaction Failed")
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});


client.login(mainConfig.SECRETS.TOKEN);
