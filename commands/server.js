module.exports = {
  name: 'sever',
  description:'Shows Information About the Sever',
  execute (msg, args) {
    const embedServer = new Discord.MessageEmbed()
    .setColor('#FFB6C1')
    .setDescription(`Sever Name: ${msg.guild.name}`)
    .setFooter(`Total Members: ${msg.guild.memberCount}`)
     msg.channel.send(embedServer)
  },
};
