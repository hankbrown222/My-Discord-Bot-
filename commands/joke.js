const giveMeAJoke = require('discord-jokes')

module.exports = {
	name: 'joke',
	description: 'Sends A Joke',
	execute(msg, args) {
		  giveMeAJoke.getRandomDadJoke(function(joke){
        msg.reply(joke)
      })
      
  
	},
};
