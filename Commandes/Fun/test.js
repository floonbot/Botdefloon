const fs = require("fs");
const nHentai = require('shentai')
const sHentai = new nHentai

module.exports = {

  name: "test",
  description: "Pose une question et il te dira la vérité",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",

  async run(bot, message, args) {

    await message.deferReply()

    try {
 
        const doujin = (await sHentai.getRandom())
        console.log(doujin)

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE TEST !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE TEST !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}