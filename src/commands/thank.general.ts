import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("thank")
    .setDescription("Say thank you to someone.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who do you want to thank?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("thanks-note")
        .setDescription("Why do you want to thank him/her?")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user");
    const note = interaction.options.getString("thanks-note");
    const mainEmbed = new MessageEmbed();
    mainEmbed
      .setColor("#332191")
      .setTitle(`Thanks ${user.username}!`)
      .setDescription(
        `${user.username} you have been thanked by ${interaction.user.username}! for *${note}*`
      )
      .setThumbnail(user.displayAvatarURL({ format: "jpg" }));
    const dmEmbed = new MessageEmbed();
    dmEmbed
      .setColor("#332191")
      .setTitle(`You got thanked by ${interaction.user.username}!`)
      .setDescription(
        `Check ${interaction.guild.name}'s <#${interaction.channel}> channel to check the note :)`
      );
    return await (interaction.reply({ embeds: [mainEmbed] }),
    user.send({ embeds: [dmEmbed] }));
  },
};
