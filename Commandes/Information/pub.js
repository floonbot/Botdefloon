
module.exports = {

  name: "pub",
  description: "Affiche la chaine youtube",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message, args) {

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guildId = '${message.guildId}'`, async (err, req) => {

      try {

        if (req[0].pub === "false") { message.reply({ content: "Veuiller active le setyoutube sur on !!", ephemeral: true }) }

        else {

          await message.deferReply()

          message.followUp(`${req[0].lienYoutube}`)
        }
      } catch (err) {

        message.reply({ content: "Le serveur n'est pas encore enregistrer, veuillez écrire un message !!", ephemeral: true })

      }
    })
  }
}