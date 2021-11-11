import { GuildMember, TextChannel } from "discord.js";

export = {
  name: "guildMemberRemove",
  async execute(member: GuildMember) {
    await member.guild.members.fetch();
    const channel = member.guild.channels.cache.get(
      "892329033625382912",
    ) as TextChannel;

    return await channel?.send(`Sad that brother gone :(! <@${member}>`);
  },
};
