const { Permissions } = require("discord.js");
module.exports = {
  name: "guildMemberAdd",
  async execute(member){
    member.guild.roles.everyone.setPermissions([
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.USE_APPLICATION_COMMANDS,
    ]);

    const channel = member.guild.channels.cache.get(
      "892329033625382912"
    );
    return await channel?.send(`Welcome! <@${member}>`);
  },
};
