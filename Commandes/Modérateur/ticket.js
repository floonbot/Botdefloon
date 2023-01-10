const Discord = require("discord.js")

module.exports = {

    name: "ticket",
    description: "Permet d'envoyer l'embed des tickets",
    permission: "Aucune",
    dm: false,
    category: "🧑🏻‍⚖️Modération",

    async run(bot, message, args) {

        const EmbedTicket1 = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`***CRÉE UN TICKET :***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`Pour **Ouvrir** un **Ticket** Séléctionnez la **catégorie** qui vous convient`)
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

        const RowTicket = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('menuticket')
                    .setPlaceholder('✅ |CHOIX  !!')
                    .addOptions(
                        {
                            label: `Questions`,
                            description: `Poser une question de tout type`,
                            emoji: `❓`,
                            value: `Questions`,
                        },
                        {
                            label: `Plainte`,
                            description: `Faire une plainte envers un staff ou un membre du Discord`,
                            emoji: `🖋`,
                            value: `Plainte`,
                        },
                        {
                            label: `Bug`,
                            description: `Signaler un bug`,
                            emoji: `⚠`,
                            value: `Bug`,
                        }
                    )
            )

        await message.reply({ embeds: [EmbedTicket1], components: [RowTicket] })
    }
}