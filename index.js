
//vars for my bot

const Discord =  require('discord.js')
const client = new Discord.Client()
const fetch = require("node-fetch")
const giveMeAJoke = require('discord-jokes')
const { readdirSync } = require('fs');
const { join } = require('path');
client.commands= new Discord.Collection();

const prefix ='-'
 const { token } = require('./config.json');

client.login(token);

//command, not being used now..//
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

//Jokes//
giveMeAJoke.getRandomDadJoke (function(joke){
 console.log(joke)
});

//function for quote//
function getQuote () {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0] ['q'] + " -" + data[0]['a']
    })
}


//ready,status//
client.on('ready', () => {
 console.log(`Logged In As ${client.user.tag}!`)
 
 client.user.setActivity('With Your Mom Lmfao')
})
 
//Msg//
client.on('message', msg => {
 if (msg.author.bot){
   return null
 }
 //quote msg//
 if(msg.content === '-quote') {
   getQuote().then(quote => msg.channel.send(quote))
 }
 //command//
 if (msg.content === '?commands'){
   const embed = new Discord.MessageEmbed()
   .setColor('#FFB6C1')
   .setAuthor('My Main Commands Are -Joke and -Quote!')
   .setTitle('My Commands!')
   .setDescription('-peepee, -ping, -pong, -joke, -troll, -quote')
   .setFooter('More To Come For The Worlds Best Dev, Hank Brown');
 
   msg.reply(embed)
 }
 
 //smallcommands//
 if (msg.content === '-ping') {
   msg.reply('pong')
 } else if (msg.content === '-pong') {
   msg.reply('ping')
 } else if (msg.content === '-joke'){
   giveMeAJoke.getRandomDadJoke(function(joke){
     msg.channel.send(joke)
   })
 } else if(msg.content === '-peepee') {
   msg.reply('poopoo')
 } else if(msg.content === '-weather'){
   msg.channel.send('Dev is Working On This Feature')
 } else if (msg.content === '-troll'){
   msg.reply('What Do You Do With A Soccer Ball?')
 } 
 
});
