import { red } from "chalk";
import { CommandInteraction } from "discord.js/typings/index.js";
import client from "../Neptune";

export = {
  name: "interactionCreate",
  once: false,
  async execute(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;
    const commands = (client as any).commands;
    const command = commands.get(interaction.commandName);

    if (!command) return;

    if (interaction.channel?.type == "DM") {
      interaction.reply("Commands are not allowed to be used in DM's");
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
