const { EmbedBuilder, ApplicationCommandOptionType, AttachmentBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'reset-level',
  description: "Retirer tout les niveaux d'un membre",
  permission: "Aucune",
  dm: false,
  category: "💹Experience",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Quel est le membre ?",
      required: true,
      autocomplete: false,
    },
  ],
  async run(bot, message, args, db) {
    let user = args.getUser("membre")

    db.query(`SELECT * FROM xp WHERE guildId = '${message.guild.id}' AND userId = '${user.id}'`, async (err, req) => {
      if (req[0].level <= 0) {

        let Embed = new EmbedBuilder()
          .setTitle("Niveau retirer")
         .setDescription(`Aucun niveau on été retirer à ${user}, car il est déjà niveau 0`)

        message.reply({ embeds: [Embed] })
      } else {
        let Embed = new EmbedBuilder()
          .setTitle("Niveau Retirer")
          .setDescription(`Tout les niveaux (${req[0].level}) de ${user} on été retirer par ${message.user}`)

        message.reply({ embeds: [Embed] })

        db.query(`UPDATE xp SET level = '0' WHERE guildId = '${message.guild.id}' AND userId = '${user.id}'`)
      }
    })
  }
}