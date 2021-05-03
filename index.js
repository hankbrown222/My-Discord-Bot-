const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch")
const { prefix, token } = require('./config.json');
const fs = require('fs');
const api = require('imageapi.js')
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//hosting dev.to//
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('JokeBot is hosted !'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

client.login(token)

//on ready
client.once('ready', () => {
	console.log(`Beep, Boop ${client.user.tag} is Online!`);
  client.user.setActivity('With Your Mom', { type: 'PLAYING' })
});


//Messages//
client.on('message', async msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase(); 

  if (msg.content.startsWith(`${prefix}ping`)) {
    client.commands.get('ping').execute(msg, args);

  } else if (msg.content.startsWith(`${prefix}beep`)) {
	  msg.channel.send('boop!');

  } else if (msg.content === `${prefix}server`) {
   	const embedServer = new Discord.MessageEmbed()
    .setColor('#FFB6C1')
    .setDescription(`Sever Name: ${msg.guild.name}`)
    .setFooter(`Total Members: ${msg.guild.memberCount}`)
     msg.channel.send(embedServer)
    


  } else if (msg.content === `${prefix}userinfo`) {
	msg.reply(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);

  } else if (msg.content.startsWith(`${prefix}troll`)){
      const taggedUser = msg.mentions.user

      msg.channel.send("The phrase 'it's just a game' is such a weak mindset. You are ok with what happened, losing, imperfection of a craft. When you stop getting angry after losing, you've lost twice. There's always something to learn, and always room for improvement, never settle. -Ninja")
  } else if(msg.content.startsWith(`${prefix}pfp`)) {
      if (!msg.mentions.users.size) {
		    return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

  } else if(msg.content.startsWith(`${prefix}joke`)){
    client.commands.get('joke').execute(msg, args);

    //weather command
  } else if(msg.content.startsWith(`${prefix}weather`)) {
    client.commands.get('weather').execute(client, msg, args)

  } else if(msg.content.startsWith(`${prefix}quote`)){
    client.commands.get('quote').execute(client, msg, args)

  } else if(msg.content.startsWith(`${prefix}commandz`)) {
    const embedcommmands = new Discord.MessageEmbed()
    .setColor('#FFB6C1')
    .setTitle('My Commands!')
    .setAuthor('My Main Commands Include Joke, Quote, Weather, Kick, and Meme!')
    .setDescription('Other usefull and fun commands are ping, server, userinfo, pfp, beep, and troll! Remember My Commands are Called With the Prefix "-"')
    .setFooter('More To Come From My Amazing Dev')

    msg.reply(embedcommmands)
    //r/meme command//
  } else if(msg.content.startsWith(`${prefix}meme`)) {
      let subreddits = [
      "memes","dankmemes"
    ];
    let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];
    let img = await api(subreddit)
    const Embed = new Discord.MessageEmbed()
    .setTitle(`A meme from r/dankmemes`)
    .setURL(`https://www.reddit.com/r/dankmemes`)
    .setColor('RANDOM')
    .setImage(img)
    msg.channel.send(Embed)
    //kick command!!//
  } else if (msg.content.startsWith(`${prefix}kick`)) {
    client.commands.get('kick').execute(msg, args)
  } 

//weird commmand shit dont mess with this
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);


try {
	 //command.execute(msg, args);
} catch (error) {
	console.error(error);
	msg.reply('there was an error trying to execute that command!');
}

});
  //for loop for finding called command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
