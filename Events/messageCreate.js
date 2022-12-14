const Discord = require("discord.js");
const { PermissionsBitField } = require("discord.js");
const { language} = require(".././json/Motban.json")

module.exports = async (bot, message) => {

  let db = bot.db;

  if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

  db.query(`SELECT * FROM server WHERE guildId = '${message.guild.id}'`, async (err, req) => {

    if (req.length < 1) {

      db.query(`INSERT INTO server (guildId, captcha, logs, antiraid, welcome, goodbye, suggest, pub, antispam) VALUES (${message.guild.id} ,'false','false','false', 'false', 'false', 'false', 'false', 'false')`)
    }


    if (req[0].antispam === "true") await bot.fonction.searchSpam(message)

  })

  db.query(`SELECT * FROM serverchannel WHERE guildId = '${message.guild.id}'`, async (err, req) => {

    if (req.length < 1) {

      db.query(`INSERT INTO serverchannel (guildId, guild, welcomeS, goodbyeS, logsS, captchaS, suggestS) VALUES (${message.guild.id}, '${message.guild.name}' ,'false','false','false','false','false')`)
    }
  })

  db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, async (err, req) => {

    if (req.length < 1) {

      db.query(`INSERT INTO mmorpg (guildId, userId , name, race, classe, description ) VALUES (${message.guild.id}, '${message.author.id}' ,'false','false','false','false')`)
    }
  })

  db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`, async (err, req) => {

    if (req.length < 1) {

      db.query(`INSERT INTO xp (guild, guildId, userId,  xp, level) VALUES ('${message.guild.name}','${message.guildId}' ,'${message.author.id}', '0', '0')`)

    } else {

      let level = parseInt(req[0].level)
      let xp = parseInt(req[0].xp)

      if ((level + 1) * 1000 <= xp) {

        db.query(`UPDATE xp SET xp = '${xp - ((level + 1) * 1000)}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)
        db.query(`UPDATE xp SET level = '${level + 1}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)

        let Embed = new Discord.EmbedBuilder()
          .setTitle(`Level`)
          .setColor("#ffffff")
          .setDescription(`${message.author} est pass?? niveau ${level + 1}, f??licitations `)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setFooter({ text: `Level`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        await message.channel.send({ embeds: [Embed] })

      } else {

        let xptogive = Math.floor(Math.random() * 30) + 1;

        db.query(`UPDATE xp SET xp = '${xp + xptogive}' WHERE guildId = '${message.guildId}' AND userId = '${message.author.id}'`)

        console.log(`${message.author.tag} a gagner ${xptogive} sur le serveur ${message.guild.name}`)
      }
    }
  })


  if (message.content.includes("https://") || message.content.includes("discord.gg") || message.content.includes("http://") || message.content.includes(language) ) {

    if (message.member.permissions.has(PermissionsBitField.resolve("ManageChannels"))) {
      return

    } else {

      await message.delete();
      try { await message.member.send({ content: `Le lien/mot ${message.content} est interdits dans le serveur ${message.guild.name}, sauf si tu as la permissions ManageChannels` }) } catch (err) { }
      return await message.channel.send({ content: `${message.author}, Vous n'avez pas le droit de post?? ce genre de lien/mot !! Sauf si vous avez la permission MenageChannels` }).then((msg) => {
        setTimeout(() => msg.delete(), 10000)

        console.log(`${message.content}`)
      })
    }

  } else if ((!message.content.includes("https://") || !message.content.includes("discord.gg") || !message.content.includes("http://"))) {
    return
  }

}
