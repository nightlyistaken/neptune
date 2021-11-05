import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
export = {
  data: new SlashCommandBuilder()
    .setName("god")
    .setDescription("Check your god level!"),
  async execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`You're a ${Math.floor(Math.random() * 100 + 1)}% god!`);
    return await interaction.reply({ embeds: [embed] });
  },
};
