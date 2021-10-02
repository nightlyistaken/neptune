import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("god")
    .setDescription("Check your god level!"),
  async execute(interaction: any) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`You're a ${Math.floor(Math.random() * 100 + 1)}% god!`);
    return await interaction.reply({ embeds: [embed] });
  },
};
