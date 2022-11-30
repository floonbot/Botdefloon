const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (bot, message) => {

  let db = bot.db;

  db.query(`SELECT logs FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

    if (req[0].logs === "false") return;

    let channel = message.guild.channels.cache.get(req[0].logs);
    if (!channel) return;

    const AuditsLogs = await message.guild.fetchAuditLogs({
      type: Discord.AuditLogEvent.EmojiUpdate,
      limit: 1
    })

    const LatestMessageDeleted = AuditsLogs.entries.first();

    let Embed = new Discord.EmbedBuilder()
      .setColor("#FFD6EF")
      .setTitle("Emojie Update")
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`
                
                > **Auteur :** ${LatestMessageDeleted.executor.tag}
                > **Name : **${message.name}
                > **Date  :** <t:${Math.floor(message.createdAt / 1000)}:F>`)

      .setFooter({ text: "emojiUpdate" })
      .setTimestamp()
    channel.send({ embeds: [Embed] });
  })
}