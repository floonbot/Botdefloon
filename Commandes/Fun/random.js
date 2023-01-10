const Discord = require('discord.js');
const { randomE } = require("../../json/emoji.json");

module.exports = {
  name: "random",
  description: "Permet de choisir un nombre random",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",

  async run(bot, message) {

    let min = 1;
    let max = 100;
    let random = Math.floor(Math.random() * (max - min)) + min;

    randomEmbed = new Discord.EmbedBuilder()
      .setTitle(`***TU AS OBTENU LE NOMBRE***`)
      .setColor("#00A705")
      .setDescription(`> ${randomE} Tu as obtenue le nombre : \`${random}\``)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setTimestamp()
      .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
    await message.reply({ embeds: [randomEmbed] })
  }
}