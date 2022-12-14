const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (bot, message) => {

  let db = bot.db;

  db.query(`SELECT logs FROM server WHERE guildId = '${message.guildId}'`, async (err, req) => {

    if (message.author.bot) return;
    if (req[0].logs === "false") return;
    else {

      db.query(`SELECT * FROM serverchannel WHERE guildId = '${message.guild.id}'`, async (err, req) => {
        let channel = message.guild.channels.cache.get(req[0].logsS);
        if (!channel) return;

        const AuditsLogs = await message.guild.fetchAuditLogs({
          type: Discord.AuditLogEvent.MessageDelete,
          limit: 1
        })

        const LatestMessageDeleted = AuditsLogs.entries.first();

        let Embed = new Discord.EmbedBuilder()
          .setColor("#FFD6EF")
          .setTitle("Message supprimé")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`
					
					> **Auteur :** ${LatestMessageDeleted.executor.tag}
			    	> **Date :**   <t:${Math.floor(message.createdAt / 1000)}:F>
					> **Contenu :** \`\`\`${message.content}\`\`\``)
          .setFooter({ text: "MessageDelete" })
          .setTimestamp()
        channel.send({ embeds: [Embed] });
      }
      )
    }
  })
}
