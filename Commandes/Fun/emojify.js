const Discord = require('discord.js');
const { roleE } = require("../.././json/emoji.json");
const fs = require('fs');

module.exports = {  

  name: 'emojify',
  description: "Permet de mettre le text en emoji",
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
    },
  ],

  async run(bot, message, args) {

    await message.deferReply()

    try {

      if (!args.getString("text")) return message.reply({ content: "Merci de mettre un text valide !!", ephemeral: true })
      const specialCodes = {
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '#': ':hash:',
        '*': ':asterisk:',
        '?': ':grey_question:',
        '!': ':grey_exclamation:',
        ' ': '   '
      }

      let text = args.getString("text").toLowerCase().split('').map(letter => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}:`
        } else if (specialCodes[letter]) {
          return `${specialCodes[letter]}`
        }
        return letter;
      }).join('');

        message.followUp(text)
      
    }
    catch (err) {
      console.log(`
    >------------ OUPS UNE ERREUR ------------<
    
    UNE ERREUR DANS LA COMMANDE EMOJIFY !!

    >--------------- L'ERREUR ----------------<

    ${err}
    
    >-----------------------------------------<
    `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE EMOJIFY !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}