const Discord = require('discord.js');
const { dé } = require("../.././json/emoji.json");

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

        let déEmbed = new Discord.EmbedBuilder()
            .setTitle(`***TU AS OBTENU LE CHIFFRE***`)
            .setColor("#00A705")
            .setDescription(`> ${dé} Tu as obtenue le chiffre : \`${random}\``)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [déEmbed] })
    }
}