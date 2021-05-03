const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "Command kicks losers that are being annoying/semi lol",
    requiredPermissions: ['ADMINISTRATOR', "KICK_MEMBERS"],
    execute(msg, args){
        const member = msg.mentions.users.first();
        if(member){
            const memberTarget = msg.guild.members.cache.get(member.id);
            memberTarget.kick();
            msg.channel.send("User got kick lmao");
        }else{
            msg.channel.send(`You can't kick then, #mald`);
        }
    }
}
