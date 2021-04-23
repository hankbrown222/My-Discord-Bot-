const fetch = require("node-fetch")

module.exports ={
  name:'quote',
  descriptio:'Finds a random quote and sends it',

  execute(client, msg, arg){
      function getQuote () {
        return fetch("https://zenquotes.io/api/random")
       .then(res => {
         return res.json()
        })
        .then(data => {
       return data[0] ['q'] + " -" + data[0]['a']
      })
    }
    getQuote().then(quote => msg.channel.send(quote))

  }

}
