import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggest someone with a poll")
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("What is your suggestion?")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("destination")
        .setDescription("Select a channel")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const input = interaction.options.getString("suggestion");
    const channel = interaction.options.getChannel("destination");
    const embed = new MessageEmbed();

    embed
      .setColor("#332191")
      .setAuthor(
        interaction.user.username,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(input);

    const message = await channel
      .send({
        embeds: [embed],
        fetchReply: true,
      })
      .then(async (msg: any) => {
        await msg.react("👍");
        await msg.react("👎");
      });
    return await (interaction.reply({
      content: `Sent a suggestion in <#${channel.id}>!`,
      ephemeral: true ,
    }),
    message);
  },
};
