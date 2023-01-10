const Discord = require("discord.js");
const { Emojibot } = require("../.././json/emoji.json");

module.exports = {

    name: "bot-list",
    description: "Permet de regarder le nombre de bot",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const list = message.guild.members.cache.filter(m => m.user.bot).map(m => `> \`${m.user.tag}\``).join(`\n`)

        let botEmbed = new Discord.EmbedBuilder()
            .setTitle(`***LISTE DES BOTS SUR LE SERVEUR***`)
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${Emojibot} **__Les pseudo des bots :__**
                
                 ${list}`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()
        message.reply({ embeds: [botEmbed] })
    }
}