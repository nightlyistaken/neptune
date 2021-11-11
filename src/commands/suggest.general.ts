import { SlashCommandBuilder } from "@discordjs/builders";
import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  CommandInteraction,
  TextChannel,
} from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggest someone with a poll")
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("What is your suggestion?")
        .setRequired(true),
    )
    .addChannelOption((option) =>
      option
        .setName("destination")
        .setDescription("Select a channel")
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const input =
      interaction.options.getString("suggestion") || "No suggestion specified";
    const channel = interaction.options.getChannel(
      "destination",
    ) as TextChannel;

    const unknownTypeRow = new MessageActionRow();

    unknownTypeRow.addComponents(
      new MessageButton()
        .setLabel("Contact Support")
        .setStyle("LINK")
        .setURL("https://dhairy-online.github.io/neptune"),
    );
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setAuthor(
        interaction.user.username,
        interaction.user.displayAvatarURL({
          dynamic: true,
        }),
      )
      .setDescription(input);
    if (channel?.type === "GUILD_TEXT") {
      const message = channel
        ?.send({
          embeds: [embed],
        })
        .then(async (msg) => {
          await msg.react("👍");
          await msg.react("👎");
        });
      return await (interaction.reply({
        content: `Sent a suggestion in <#${channel?.id}>!`,
        ephemeral: true,
      }),
      message);
    } else if (channel.type === "GUILD_VOICE") {
      return await interaction.reply({
        content: `<#${channel?.id}> is a Voice Channel. Select a Text Channel to post a suggestion...`,
        ephemeral: true,
      });
    } else if (channel.type === "UNKNOWN") {
      return await interaction.reply({
        content: `<#${channel?.id}> is a unsupported channel. If you think this is a issue, click the button below to contact the owner.`,
        ephemeral: true,
        components: [unknownTypeRow],
      });
    }
  },
};
