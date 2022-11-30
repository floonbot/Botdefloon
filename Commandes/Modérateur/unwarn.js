const Discord = require("discord.js");
const { modoE, serveurE, userE, warnE } = require("../.././json/emoji.json");

module.exports = {

  name: "unwarn",
  description: "Permet de supprimer un warn d'un membre",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: `🧑🏻‍⚖️Modération`,
  options: [{
    type: "user",
    name: "membre",
    description: "Quel est le membre ?",
    required: true,
    autocomplete: false
  },
  {
    type: "string",
    name: "unwarn",
    description: "Quel est l'id du warn ?",
    required: true,
    autocomplete: false
  },
  ],

  async run(bot, message, args, db) {

    let user = args.getUser("membre")
    if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
    let member = message.guild.members.cache.get(user.id)
    if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

    db.query(`SELECT * FROM warns WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {
      let warns = args.getString("unwarn") || req[0].warn
      if (!warns) return message.reply({ content: "Pas de warn !!", ephemeral: true })

      await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
      if (req.length < 1) return message.reply({ content: "Ce membre n'a pas de warn !!", ephemeral: true })

      try {

        let unwarnEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Unwarn par ${message.user.tag}`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${warnE} **__UnWarn__**
                
                > ${serveurE} **Serveur :** \`${message.guild.name}\`
                > ${modoE} **Modérateur :** \`${message.user.tag}\`!`)
          .setTimestamp()
          .setFooter({ text: "Unwarn" })

        await user.send({ embeds: [unwarnEmbed] })

      } catch (err) { return }

      await message.deferReply()

      let Embed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande unwarn !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${warnE}**__Je unwarn le membre__**${warnE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "unwarn" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let unwarnEmbed = new Discord.EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`le membre a étais unwarn.`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${warnE} **__UnWarn__** \
            
            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${userE} **Membre :** \`${user.tag}\`!`)
          .setTimestamp()
          .setFooter({ text: "Unwarn" })
        setTimeout(async () => await message.editReply({ embeds: [unwarnEmbed] }), 2000)
      })

      db.query(`DELETE FROM warns WHERE guildId = '${message.guildId}' AND warn = '${warns}'`)
    })
  }
}