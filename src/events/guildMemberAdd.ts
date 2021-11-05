import { GuildMember, Permissions, TextChannel } from "discord.js";

export = {
  name: "guildMemberAdd",
  async execute(member : GuildMember){
    member.guild.roles.everyone.setPermissions([
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.USE_APPLICATION_COMMANDS,
    ]);

    const channel = member.guild.channels.cache.get(
      "892329033625382912"
    ) as TextChannel;
    return await channel?.send(`Welcome! <@${member}>`);
  },
};
