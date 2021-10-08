module.exports = {
  name: "guildMemberRemove",
  async execute(member){
    await member.guild.members.fetch();
    const channel = member.guild.channels.cache.get(
      "892329033625382912"
    );

    return await channel?.send(`Sad that brother gone :(! <@${member}>`);
  },
};
