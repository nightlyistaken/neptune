const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Are you a admin? Ban someone!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to ban the user? ")
    ),
  async execute(interaction) {
    const user = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "Not given";
    // TODO: Ban command
    user?.kick(reason);
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`Banned! ${Math.floor(Math.random() * 100 + 1)}% :) ${user}`);
    return await interaction.reply({ embeds: [embed] });
  },
};
