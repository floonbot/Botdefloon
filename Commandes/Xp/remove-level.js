const Discord = require('discord.js')

module.exports = {
    name: 'remove-level',
    description: 'Retirer des levels a un membre',
    permission: "Aucune",
    dm: false,
    category: "💹Experience",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre ?",
            required: true,
            autocomplete: true,
        },
        {
            type: "number",
            name: "level",
            description: "le nombre de level a retirer",
            required: true,
            autocomplete: true,
        }
    ],
    async run(bot, message, args, db) {
        let user = args.getUser("membre")

        db.query(`SELECT * FROM xp WHERE guildId = '${message.guild.id}' AND userId = '${user.id}'`, async (err, req) => {
            let level = req[0].level
            let leveltoremove = args.getNumber("level")

            if (level <= 0) {
                db.query(`UPDATE xp SET level = '0' WHERE guildId = '${message.guild.id}' AND userId = '${user.id}'`)

                let Embed = new Discord.EmbedBuilder()
                    .setTitle("Niveau retirer")
                    .setDescription(`Aucun niveau on été retirer à ${user}, car il est déjà niveau 0`)

                message.reply({ embeds: [Embed] })
            } else {
                db.query(`UPDATE xp SET level = '${level - leveltoremove}' WHERE guildId = '${message.guild.id}' AND userId = '${user.id}' `)

                let Embed = new Discord.EmbedBuilder()
                    .setTitle("Niveau retirer")
                    .setDescription(`\`${leveltoremove} niveaux\` on été retirer à ${user} par ${message.user}`)

                message.reply({ embeds: [Embed] })
            }
        })
    }
}