const Discord = require("discord.js");
const { boostE } = require("../.././json/emoji.json");

module.exports = {

    name: "booster-list",
    description: "Permet de voir la liste des boosts sur le serveur",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const booster = message.guild.members.cache.filter(member => member.preniumSince).map(m => `> \`${m.user.tag}\``).join(`\n`) || "Auncun Utilisateur"

        let boostEmbed = new Discord.EmbedBuilder()
            .setTitle("***LISTE DES BOOSTES***")
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${boostE} **__Le nombre de boost :__**
                
                 ${booster}`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()
        await message.reply({ embeds: [boostEmbed] })
    }
}