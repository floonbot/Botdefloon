const Discord = require("discord.js");
const fs = require("fs");
const { nsfwE } = require("../.././json/emoji.json");
const { pussy } = require("../.././json/NSFW/pussy.json");
const { aHarem } = require("../.././json/NSFW/aHarem.json");
const { boobs } = require("../.././json/NSFW/boobs.json")
const { AttachmentBuilder } = require("discord.js");

module.exports = {

  name: "nsfw",
  description: "envoye une image nsfw",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "category",
      description: "Quel est la category du nsfw",
      required: true,
      autocomplete: true,
    }
  ],

  async run(bot, message, args) {

    let choix = args.getString("category")
    if (!message.channel.nsfw) return message.reply("Ce n'est pas un salon nsfw !!")

    try {

      const cEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande nsfw !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${nsfwE} **__Je cherche le nsfw choisi__** ${nsfwE}

                > **Sur le serveur :** ${message.guild.name}
                
                \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "Nsfw" })

      if (choix === "pussy") {

        let pussyradom = Math.floor(Math.random() * pussy.length);
        let pussymotRandom = pussy[pussyradom];
        const file = new AttachmentBuilder(`./assets/nsfw/pussy/${pussymotRandom}`, { name: `pussy.gif` })

        await message.deferReply({ ephemeral: true })

        return await message.followUp({ embeds: [cEmbed] }).then(() => {

          const pussyEmbed = new Discord.EmbedBuilder()
            .setColor("DC00FF")
            .setImage(`attachment://${file.name}`)
          setTimeout(async () => await message.channel.send({ embeds: [pussyEmbed], files: [file] }), 2000)
        })
      }

      if (choix === "boobs") {

        let boobsradom = Math.floor(Math.random() * boobs.length);
        let boobsmotRandom = boobs[boobsradom];
        const file = new AttachmentBuilder(`./assets/nsfw/boobs/${boobsmotRandom}`, { name: `boobs.gif` })

        await message.deferReply({ ephemeral: true })

        return await message.followUp({ embeds: [cEmbed] }).then(() => {

          const boobsEmbed = new Discord.EmbedBuilder()
            .setColor("DC00FF")
            .setImage(`attachment://${file.name}`)
          setTimeout(async () => await message.channel.send({ embeds: [boobsEmbed], files: [file] }), 2000)
        })
      }

      if (choix === "aHarem") {

        let aHaremradom = Math.floor(Math.random() * aHarem.length);
        let aHaremmotRandom = aHarem[aHaremradom];
        const file = new AttachmentBuilder(`./assets/nsfw/aHarem/${aHaremmotRandom}`, { name: `aHarem.gif` })

        await message.deferReply({ ephemeral: true })

        return await message.followUp({ embeds: [cEmbed] }).then(async () => {

          const aHaremEmbed = new Discord.EmbedBuilder()
            .setColor("DC00FF")
            .setImage(`attachment://${file.name}`)
          setTimeout(async () => await message.channel.send({ embeds: [aHaremEmbed], files: [file] }), 2000)
        })
      }

      if (choix !== "aHarem" || choix !== "pussy" || choix !== "boobs") {

        await message.deferReply({ ephemeral: true })

        return await message.followUp({ embeds: [cEmbed] }).then(async () => {

          let mauvais = new Discord.EmbedBuilder()
            .setTitle(`${nsfwE} **__Les category nsfw dispo__** ${nsfwE}`)
            .setColor("#000000")
            .setDescription("Les choix nsfw dispo sont : \n\n \`pussy\`\n \`aHarem\`\n \`boobs\`")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: "NSFW" })
          setTimeout(async () => await message.channel.send({ embeds: [mauvais] }), 2000)
        })
      }
    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE NSFW !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR DANS LA COMMANDE NSFW !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })


    }
  }
}