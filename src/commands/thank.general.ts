import { SlashCommandBuilder, bold, italic } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed, User } from "discord.js";

export = {
  data: new SlashCommandBuilder()
    .setName("thanks")
    .setDescription("Say thank you to someone.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Who do you want to thank?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("thanks-note")
        .setDescription("Why do you want to thank him/her?")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser("user");
    const note = interaction.options.getString("thanks-note");
    const mainEmbed = new MessageEmbed();
    mainEmbed
      .setColor("#332191")
      .setTitle(`Thanks ${user?.username}!`)
      .setDescription(
        `${user?.username} you have been thanked by ${interaction.user.username}! for *${note}*`
      )
      .setThumbnail((user as User)?.displayAvatarURL({ format: "jpg" }))
      .setTimestamp();

      const selfEmbed = new MessageEmbed();
      selfEmbed
        .setColor("#332191")
        .setTitle(`Thanks ${user?.username}!`)
        .setDescription(
          `${user?.username} you have been thanked by ${interaction.user.username}!....
          wait ${bold(interaction.user.username)} thanked itself! -_-`
        )
        .setThumbnail((user as User)?.displayAvatarURL({ format: "jpg" }))
        .setTimestamp();

    if (user?.bot) {
      
      if(user?.username == interaction.client.user?.username) {
       interaction.reply(bold(`Welcome <@${interaction.user.id}> ฅ(=＾◕ᆺ◕＾=)ฅ`))
      } else {
        interaction.reply(`${bold(`${user?.username}`)} is a bot!, can it be ${italic(`${bold("me?")} ฅ(=＾◕ᆺ◕＾=)ฅ`)}`)
      }
    
    } else {
      if (user?.username == interaction.user.username) {
        return await interaction.reply({ embeds: [selfEmbed] });
      } else {
        return await interaction.reply({ embeds: [mainEmbed] });
      }
    }
    
    
  },
};
