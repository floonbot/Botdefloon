const Discord = require('discord.js');

module.exports = async (bot, channels) => {

  let db = bot.db;

  db.query(`SELECT logs FROM server WHERE guild = '${channels.guild.id}'`, async (err, req) => {
    const fetchAuditLogs = await channels.guild.fetchAuditLogs({
      type: Discord.AuditLogEvent.ChannelDelete,
      limit: 1
    })

    if (req[0].logs === "false") return

    let channel = channels.guild.channels.cache.get(req[0].logs);

    const LatestChannel = fetchAuditLogs.entries.first()

    let Embed = new Discord.EmbedBuilder()
      .setColor("#FFD6EF")
      .setTitle("suppression d'un salon")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`
                
                > **Auteur :** ${LatestChannel.executor.tag}
                > **Salon :** ${channels.name}
                > **Date  :** <t:${Math.floor(channels.createdAt / 1000)}:F>\n`)

      .setFooter({ text: "channelDelete" })
      .setTimestamp()
    channel.send({ embeds: [Embed] });
  })
}




