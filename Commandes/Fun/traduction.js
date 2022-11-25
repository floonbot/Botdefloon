const translate = require('@iamtraction/google-translate');
const fs = require('fs');
const Discord = require("discord.js");

module.exports = {

  name: "traduction",
  description: "Permet de tradruire du text",
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
    {
      type: "string",
      name: "langue",
      description: "Quel est le language ?",
      required: true,
      autocomplete: true
    }
  ],

  async run(bot, message, args) {

    try {

      const query = args.getString("text")
      const langue = args.getString("langue")

      await message.deferReply()

      if(langue === "fr") {
      const translated = await translate(query, { to: 'fr' });
     return message.followUp(`${translated.text}`)
      }

      if(langue === "ja") {
        const translated = await translate(query, { to: 'ja' });
       return message.followUp(`${translated.text}`)
        }

        if(langue === "en") {
          const translated = await translate(query, { to: 'en' });
         return message.followUp(`${translated.text}`)
          }

      if (langue !== "fr" || langue !== "en" || langue !== "ja") {
        let mauvais = new Discord.EmbedBuilder()
          .setTitle(`👅 **__Les langues dispo__** 👅`)
          .setColor("#000000")
          .setDescription("Les choix des langues dispo sont : \n\n \`fr\`\n \`en\`\n \`ja\`")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "traduction" })
        return await message.followUp({ embeds: [mauvais] })
      }
    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE TRADUCTION !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE TRADUCTION !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}