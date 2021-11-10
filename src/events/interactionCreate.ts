import { red } from "chalk";
import { CommandInteraction } from "discord.js";
import client from "..";
import fs from "fs"; 

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.data.name, command);
}

export = {
  name: "interactionCreate",
  once: false,
  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;
    const commands = client.commands;
    const command = commands.get(interaction.commandName);

    if (!command) return;

    if (interaction.channel?.type == "DM") {
      interaction.reply("Commands are not allowed to be used in DM");
    } else {
      try {
        await command.execute(interaction);
      } catch (err) {
        console.log(red("Interaction Failed"));
        console.error(err);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
