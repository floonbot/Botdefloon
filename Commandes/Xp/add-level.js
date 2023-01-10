const Discord = require('discord.js');

module.exports = {

    name: 'add-level',
    description: 'Ajouter des niveaux à un membre',
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
        {
            type: "number",
            name: "level",
            description: "Quel est le level ?",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {
        let user = args.getUser("membre")

        db.query(`SELECT * FROM xp WHERE guildId = '${message.guild.id}' AND userId = '${user.id}'`, async (err, req) => {
            let level = parseInt(req[0].level)
            let leveltoadd = parseInt(args.getNumber("level"))

            db.query(`UPDATE xp SET level = '${level + leveltoadd}' WHERE guildId = '${message.guild.id}' AND userId = '${user.id}' `)

            let Embed = new Discord.EmbedBuilder()
                .setTitle("Niveau Ajouter")
                .setDescription(`\`${leveltoadd} niveaux\` on été ajouté à ${user} par ${message.user}`)

            message.reply({ embeds: [Embed] })

        })
    }
}