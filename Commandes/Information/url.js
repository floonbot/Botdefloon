const Discord = require("discord.js");
const { urlE } = require('../.././json/emoji.json');

module.exports = {

    name: "url",
    description: "Permet de voir l'url personnaliser du serveur",
    permission: "Aucune",
    category: "👆🏻Information",
    dm: false,

    async run(bot, message) {

        let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setDescription(message.guild.vanityURLCode ?
                `${urlE}> L'URL personnaliser du serveur est : **${message.guild.vanityURLCode}**` : `${urlE} Il n'y as pas d'URL personnaliser`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()
        await message.reply({ embeds: [Embed] })
    }
}