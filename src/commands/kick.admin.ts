import {
  CommandInteraction,
  GuildMember,
  MessageEmbed,
  Permissions,
} from "discord.js";
import { bold, SlashCommandBuilder } from "@discordjs/builders";

export = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick someone for some reason!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to kick")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to kick the user? "),
    ),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getMember("user") as GuildMember;
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const kickEmbed = new MessageEmbed();
    kickEmbed
      .setColor("#332191")
      .setTitle(`Kicked Successfully 🔨`)
      .setDescription(
        `${user} has been kicked from ${bold(`${interaction.guild?.name}`)}`,
      )
      .setFooter(
        `Kicked by ${interaction.user.tag}`,
        interaction.user?.displayAvatarURL(),
      );
    const cannotKickEmbed = new MessageEmbed();
    cannotKickEmbed
      .setColor("#332191")
      .setTitle(`You cannot kick that user 🔨`)
      .setDescription(`${user} is not kickable.`)
      .setFooter(
        `Used by ${interaction.user.tag}`,
        interaction.user?.displayAvatarURL(),
      );

    if (!user.kickable) {
      return await interaction.reply({ embeds: [cannotKickEmbed] });
    } else if (
      (interaction as any).member?.permissions.has(
        Permissions.FLAGS.BAN_MEMBERS,
      )
    ) {
      user.kick(reason);

      return await interaction.reply({ embeds: [kickEmbed] });
    }
  },
};
