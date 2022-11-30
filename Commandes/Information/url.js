const fs = require('fs');
const { urlE } = require('../.././json/emoji.json');
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "url",
  description: "Permet de voir l'url personnaliser du serveur",
  permission: "Aucune",
  category: "👆🏻Information",
  dm: false,

  async run(bot, message) {

    await message.deferReply()

    let Embed = new EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande url !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${urlE} **__Je cherche url du serveur ${message.guild.name}__** ${urlE}

            > **Sur le serveur :** ${message.guild.name}, 
            
            \`veuillez patienter\`.`)
      .setTimestamp()
      .setFooter({ text: "url" })
    await message.followUp({ embeds: [Embed] }).then(() => {

      let Embed = new EmbedBuilder()
        .setColor("#0070FF")
        .setDescription(message.guild.vanityURLCode ?
          `${urlE}> L'URL personnaliser du serveur est : **${message.guild.vanityURLCode}**` : `${urlE} Il n'y as pas d'URL personnaliser`)
        .setFooter({ text: `url` })
        .setTimestamp()
      setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
    })
  }
}