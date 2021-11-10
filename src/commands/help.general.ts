import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Interaction } from "discord.js";
import util from "util";
const wait = util.promisify(setTimeout);

export = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands"),
  async execute(interaction: CommandInteraction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("View Commands")
        .setStyle("LINK")
        .setURL("https://dhairy-online.github.io/neptune")
    );
    const target = `${interaction.user.username}`;
    const embed = new MessageEmbed();
    embed
      .setColor("DARK_BLUE")
      .setTitle(`Greetings ${target}! (* ^ ω ^)`)
      .setDescription(`Click the button below to check some of my commands!`)
      .setTimestamp()
      .setFooter(`${interaction.user.tag}`, `${interaction.user.displayAvatarURL({ format: "jpg" })}`);
    await interaction.reply({
      content: `Message sent <@${interaction.user.id}>!`,
      ephemeral: true,
    });
    await wait(2000);
    await interaction.user.send({ embeds: [embed], components: [row] });
  },
};
