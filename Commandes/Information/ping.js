const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { pingE, TimeE } = require("../.././json/emoji.json");

module.exports = {

  name: "ping",
  description: "Donne le ping du bot",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    await message.deferReply()

    const ping = Date.now() - message.createdAt;
    const api_ping = bot.ws.ping;
    const uptime = moment.duration(message.client.uptime).format(" D[d], H[h], m[m], s[s]");

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Actualiser")
          .setStyle(ButtonStyle.Success)
          //Mettre le lien de ton bot
          .setCustomId("Ping")
      )

    let pingEmbed = new Discord.EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande ping !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${pingE}**__Je cherche le ping du bot__**${pingE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
      .setTimestamp()
      .setFooter({ text: "Ping" })
    await message.followUp({ embeds: [pingEmbed] }).then(() => {

      pingEmbed = new Discord.EmbedBuilder()
        .setColor("#0070FF")
        .setTitle(`La lantence du bot`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`
                    
          > ${pingE} **Bot :** \`${ping}\` ms 
          > ${pingE} **API :** \`${api_ping}\` ms
          > ${TimeE} **Temps Uptime :** ${uptime}`)
        .setTimestamp()
        .setFooter({ text: "Ping" })
      setTimeout(() => message.editReply({ embeds: [pingEmbed], components: [row] }), 1000)
    })
  }
}