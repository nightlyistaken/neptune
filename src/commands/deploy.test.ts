import { SlashCommandBuilder } from "@discordjs/builders";
import { greenBright } from "chalk";
import { MessageEmbed } from "discord.js";
const wait = require("util").promisify(setTimeout);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Check if the bot works"),
  async execute(interaction: any) {
    const embed = new MessageEmbed();
    embed
      .setColor("#0099ff")
      .setTitle(`Testing deploy @${interaction.user.tag} ...`)
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(`1 sec...`);
    const anotherEmbed = new MessageEmbed();
    anotherEmbed
      .setColor("#00fff")
      .setTitle(`Tested`)
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(`Done!`);
    await interaction.deferReply({ ephemeral: true });
    await wait(1000);
    return await interaction.editReply({ embeds: [anotherEmbed] });
  },
};
