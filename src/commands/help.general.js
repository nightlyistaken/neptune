const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fs = require("fs");
const { COLORS } = require("../configs/main.config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Optional, get help of a specific command")
    ),
  async execute(interaction) {
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    const input = interaction.options.getString("command");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Primary")
        .setStyle("LINK")
        .setURL("https://dhairy-online.github.io/neptune")
    );
    let command = commandFiles
      .map((file) => require(`../commands/${file}`))
      .find((c) => c.data.name == input);
    if (!input) {
      const commandNames = [];
      const embed = new MessageEmbed();
      embed.setTitle("Help").setDescription("Helper is here");
      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commandNames.push(command.data.name);
        embed.setFields({ name: `Misc`, value: `${commandNames}` });
      }

      await interaction.reply({ embeds: [embed], components: [row] });
    } else {
      if (!command) {
        return await interaction.reply({
          content: "Command does not exist",
          components: [row],
        });
      }

      const embed = new MessageEmbed();
      embed
        .setColor(COLORS.PRIMARY)
        .setTitle("Help")
        .setDescription("Helper is here")
        .setFields({
          name: `${command.data.name}`,
          value: `${command.data.description}`,
        });

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  },
};
