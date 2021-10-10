const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { inlineCode } = require("@discordjs/builders");
const wait = require("util").promisify(setTimeout);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check your ping!"),
  async execute(interaction) {
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle("Pong! :tennis:")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(inlineCode(`It's ${Date.now() - interaction.createdTimestamp} ms`));
    await interaction.deferReply();
    await wait(3000);
    await interaction.followUp({ embeds: [embed] });
  },
};
