const weather = require('weather-js')

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    execute(client, msg, args){

    weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
        if(error) return msg.channel.send(error);
        if(!args[0]) return msg.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return msg.channel.send('**Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor('#FFB6C1')
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        msg.channel.send(weatherinfo)
        })        
    }
}
