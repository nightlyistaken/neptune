import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Are you a admin? Ban someone!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to ban")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to ban the user? "),
    ),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user") as GuildMember;
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    // TODO: Ban command
    user?.kick(reason);
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`Banned! ${Math.floor(Math.random() * 100 + 1)}% :) ${user}`);
    return await interaction.reply({ embeds: [embed] });
  },
};
