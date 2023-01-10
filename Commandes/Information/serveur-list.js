const Discord = require("discord.js");
const { numStr } = require('../../Fonctions/fonction');

module.exports = {

    name: 'serveur-list',
    description: 'Permet de voit le top5 des serveurs du bot',
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi")
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
            )

        let n = 0
        const guild = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) => `**${n += 1}) __${guild.name}__ :**\n\`\`\`${numStr(guild.memberCount)} Membres\n\`\`\``).slice(0, 5).join("\n");

        const embed = new Discord.EmbedBuilder()
            .setTitle(`***TOP 5 DES SERVEURS***`)
            .setDescription(`${guild}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setColor("#0070FF")
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [embed], components: [row] })
    }
}