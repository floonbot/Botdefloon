const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

  name: "pub",
  description: "Affiche la chaine youtube",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message, args) {

    let db = bot.db;

    try {

      db.query(`SELECT * FROM pub WHERE guild = '${message.guildId}'`, async (err, req) => {

        try {
          if (req[0].active === "false") { message.reply({ content: "Veuiller active le setyoutube sur on !!", ephemeral: true }) }

          else {

            await message.deferReply()

            message.followUp(`${req[0].youtube}`)
          }
        } catch (err) {

          message.reply({content : "Le serveur n'est pas encore enregistrer, veuillez écrire un message !!", ephemeral: true })

        }
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE PUB !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE PUB !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}