const Discord = require('discord.js');
const { dé } = require("../.././json/emoji.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {

  name: "dé",
  description: "Permet de faire choisir le bot entre 1 et 6",
  permission: "Aucune",
  category: "🥳Fun",
  dm: false,

  async run(bot, message) {

    let min = 1;
    let max = 6;
    let random = Math.floor(Math.random() * (max - min)) + min;

    await message.deferReply()

    let déEmbed = new Discord.EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande dé !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${dé} **__Je lance le dé__** ${dé}
                
                > **Sur le serveur :** ${message.guild.name}
                
                \`Veuillez patienter\``)
      .setTimestamp()
      .setFooter({ text: "Dé" })
    await message.followUp({ embeds: [déEmbed] }).then(() => {

      déEmbed = new EmbedBuilder()
        .setTitle(`Tu as obtenue un chiffre`)
        .setColor("#00A705")
        .setDescription(`> ${dé} Tu as obtenue le chiffre : \`${random}\``)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setTimestamp()
        .setFooter({ text: "Dé" })
      setTimeout(async () => await message.editReply({ embeds: [déEmbed] }), 1000)
    })
  }
}