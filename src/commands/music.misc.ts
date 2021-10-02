import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { ytdl } from "ytdl-core";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a music inside the current channel!"),
  async execute(interaction: any) {
    
    const voiceChannel = message.member.voice.channel;
    const embed = new MessageEmbed();
    embed
      .setColor("#332191")
      .setTitle("What's your ping?")
      .setAuthor(
        `${interaction.user.username}`,
        `${interaction.user.displayAvatarURL({ format: "jpg" })}`
      )
      .setDescription(`It's ${Date.now() - interaction.createdTimestamp} ms`);
    return await interaction.reply({ embeds: [embed] });
  },
};
