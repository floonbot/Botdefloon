const Discord = require("discord.js");
const { king } = require("../.././json/emoji.json");

module.exports = {

    name: "admin-list",
    description: "Permet de regarder le nombre d'admin",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const list = message.guild.members.cache.filter(m => !m.user.bot).filter(member => member.permissions.has([Discord.PermissionsBitField.Flags.Administrator]))

        let AdminEmbed = new Discord.EmbedBuilder()
            .setTitle("***LISTE DES ADMINISTRATEURS***")
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${king} **__Les pseudo des admins  :__**
                
                ${list.map(m => `> \`${m.user.username}\``).join("\n")}`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()
        message.reply({ embeds: [AdminEmbed] })

    }
}