const Discord = require("discord.js");
const { Sos, infoE, Emojibot } = require("../.././json/emoji.json");

module.exports = {

  name: "help",
  description: "Donne les commands du bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",


  async run(bot, message) {

    let command;

    await message.deferReply()

    if (!command) {

      let categories = [];
      bot.commands.forEach(command => {
        if (!categories.includes(command.category)) categories.push(command.category)
      })

      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.SelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('✅ |CHOIX  !!')
            .addOptions(
              {

                label: "Select pour toute l'accueil",
                description: 'accueil',
                emoji: `${Emojibot}`,
                value: 'choix7',
              },
              {

                label: 'Select pour toute les commandes',
                description: 'Toute les commandes',
                emoji: "🤖",
                value: 'choix1',
              },
              {

                label: "Select pour les commandes d'information",
                description: 'Commande information',
                emoji: `${infoE}`,
                value: 'choix3',
              },
              {

                label: 'Select pour les commandes xp',
                description: 'Commande xp',
                emoji: `💹`,
                value: 'choix2',
              },
              {

                label: 'Select pour les setcommandes',
                description: 'Set des commandes',
                emoji: `🗃️`,
                value: 'choix6',
              },
              {

                label: "Select pour les commandes fun",
                description: 'Commande fun ',
                emoji: `🥳`,
                value: 'choix4',
              },
              {

                label: "Select pour les commandes modérateur",
                description: 'Commande modérateur',
                emoji: `🧑🏻‍⚖️`,
                value: 'choix5',
              }
            )
        )

      let botEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande bot-info !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${Sos} **__Je cherche les commandes !!__** ${Sos}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "help" })
      await message.followUp({ embeds: [botEmbed] }).then(async () => {

        let Embed1 = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Bienvenue sur la commande help__**

                    > Commands disponibles : \`${bot.commands.size}\`
                    > Catégories disponibles : \`${categories.length}\``)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        setTimeout(async () => await message.editReply({ embeds: [Embed1], components: [row] }), 2000)
      })
    }
  }
}
