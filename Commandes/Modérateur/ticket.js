const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")

module.exports = {

  name: "ticket",
  description: "Envoyer l'embed des tickets",
  permission: "Aucune",
  dm: false,
  category: "🧑🏻‍⚖️Modération",

  async run(bot, message, args) {

    const EmbedTicket1 = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle(`Créer un ticket :   `)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`Pour **Ouvrir** un **Ticket** Séléctionnez la **catégorie** qui vous convient`)
      .setTimestamp()
      .setFooter({ text: "Ticket" });

    const RowTicket = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
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