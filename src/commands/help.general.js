const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const wait = require('util').promisify(setTimeout);
const { COLORS } = require("../configs/main.config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("View Commands")
        .setStyle("LINK")
        .setURL("https://dhairy-online.github.io/neptune")
    );
    const target = `${interaction.user.username}`;
    const embed = new MessageEmbed();
    embed
      .setColor(COLORS.PRIMARY)
      .setTitle(`Greetings ${target}! (* ^ ω ^)`)
      .setDescription(`Click the button below to check some of my commands!`)
      .setTimestamp()
      .setFooter(`${interaction.user.tag}`, `${interaction.user.displayAvatarURL({ format: "jpg" })}`);
    await interaction.reply({
      content: `Message sent <@${interaction.user.id}>!`,
      ephermical: true,
    });
    await wait(2000);
    await interaction.user.send({ embeds: [embed], components: [row] });
  },
};
