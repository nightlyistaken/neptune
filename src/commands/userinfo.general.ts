import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Display a user's details")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("What action should be taken with the users points?")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user");
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`${user.tag}`)
      .setDescription(
        `You are currently viewing **${user.username}'s** discord profile!`
      )
      .addFields(
        {
          name: `${user.username}'s account created at`,
          value: `${user.createdAt.toLocaleString()}`,
        },
        {
          name: `Is he/she a bot?`,
          value: `${user.bot}`,
        },
        {
          name: `${user.username}'s flags`,
          value: `*${user.flags}*`,
        },
        {
          name: `${user.username}'s ID`,
          value: `${user.id}`,
        },
        {
          name: `${user.username}'s discord tag`,
          value: `${user.username}*#*${user.discriminator}`,
        }
      )
      .setThumbnail(user.displayAvatarURL({ format: "jpg" }));
    return await interaction.reply({ embeds: [embed] });
  },
};
