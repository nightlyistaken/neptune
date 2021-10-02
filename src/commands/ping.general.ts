import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check your ping!"),
  async execute(interaction: any) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle("What's your ping?")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(`It's ${Date.now() - interaction.createdTimestamp} ms`);
    return await interaction.reply({ embeds: [embed] });
  },
};
