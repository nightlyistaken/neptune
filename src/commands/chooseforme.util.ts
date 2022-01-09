import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { inlineCode } from "@discordjs/builders";
import util from "util";
import client from "../base/NeptuneClient";
const wait = util.promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("choose")
    .setDescription("I will choose a random option for you."),
  async execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle("Pong! :tennis:")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({
          format: "jpg",
        })}`,
      )
      .setDescription(inlineCode(`It's ${client.ws.ping} ms`));
    await interaction.followUp({ embeds: [embed] });
  },
};
