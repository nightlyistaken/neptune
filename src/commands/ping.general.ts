import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { inlineCode } from "@discordjs/builders";
import util from "util";
const wait = util.promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check your ping!"),
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
      .setDescription(
        inlineCode(`It's ${Date.now() - interaction.createdTimestamp} ms`),
      );
    await interaction.deferReply();
    await wait(3000);
    await interaction.followUp({ embeds: [embed] });
  },
};
