const { Floon, infoE } = require("../.././json/emoji.json");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {

  name: "bot-info",
  description: "Les informations sur le bot",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite moi")
          .setStyle(ButtonStyle.Link)
          //Mettre le lien de ton bot
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
      )

    let botEmbed = new EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande bot-info !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${Floon} **__Je cherche les informations sur ${bot.user.tag}__** ${Floon}

            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
      .setTimestamp()
      .setFooter({ text: "bot-info" })
    await message.followUp({ embeds: [botEmbed] }).then(() => {

      botEmbed = new EmbedBuilder()
        .setTitle(`Les informations de ${bot.user.username}`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor("#0070FF")
        .setDescription(`
                __**${infoE} Informations**__

                > **Développer :** \`Floon\`
                > **Name / Tag :** \`${bot.user.username}\`
                > **Tag :** \`${bot.user.discriminator}\`
                > **Ping :** \`${bot.ws.ping}\`
                > **Temps Uptime :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}
               
                __ **${infoE} Information Compte ** __

                > **Créer :** <t:${parseInt(bot.user.createdTimestamp / 1000)}:R>
               `)
      setTimeout(() => message.editReply({ embeds: [botEmbed], components: [row] }), 1000)
    })
  }
}