const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { inlineCode, codeBlock } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check your ping!"),
  async execute(interaction) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle("What's your ping?")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(`It's ${Date.now() - interaction.createdTimestamp} ms`);
    const botPingEmbed = new MessageEmbed()
    botPingEmbed
      .setColor("#332191")
      .setTitle("What's MY ping?")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(codeBlock(`It's ${interaction}`));
    await interaction.reply({ embeds: [embed] });
    await wait(3000)
    await interaction.followUp({embeds: [botPingEmbed]})
  },
};
