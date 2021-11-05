import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed, User } from "discord.js";
import { client } from "../"
export = {
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
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    // TODO: Ban command
    (user as GuildMember)?.kick(reason);
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle(`Banned! ${Math.floor(Math.random() * 100 + 1)}% :) ${user}`);
    return await interaction.reply({ embeds: [embed] });
  },
};