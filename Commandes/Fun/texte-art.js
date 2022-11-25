const fs = require('fs');
const Discord = require("discord.js");
const figlet = require("figlet");

module.exports = {

  name: "texte-art",
  description: "Permet de faire un texte art",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "text",
      description: "Quel est le text ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    try {

      figlet.text(

        args.getString("text"),
        {

          font: "",

        },

        async (err, data) => {
          message.reply(`\`\`\`${data}\`\`\``)
        })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE TEXTE-ART !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE TEXTE-ART !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}