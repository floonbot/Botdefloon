const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { pingE, TimeE } = require("../.././json/emoji.json");

module.exports = {

  name: "ping",
  description: "Permet de voir le ping",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",

  async run(bot, message) {

    const ping = Date.now() - message.createdAt;
    const api_ping = bot.ws.ping;
    const uptime = moment.duration(message.client.uptime).format(" D[d], H[h], m[m], s[s]");

    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setLabel("Actualiser")
          .setStyle(Discord.ButtonStyle.Success)
          //Mettre le lien de ton bot
          .setCustomId("Ping")
      )

     const pingEmbed = new Discord.EmbedBuilder()
        .setColor("#0070FF")
        .setTitle(`LA LATENCE DU BOT`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`
                    
          > ${pingE} **Bot :** \`${ping}\` ms 
          > ${pingE} **API :** \`${api_ping}\` ms
          > ${TimeE} **Temps Uptime :** ${uptime}`)
        .setTimestamp()
        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
       message.reply({ embeds: [pingEmbed], components: [row] })
  }
}