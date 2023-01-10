const Discord = require("discord.js");

module.exports = {

    name: "warnlist",
    description: "Permet d'afficher les warn",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre ?",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "pas de membre !!", ephemeral: true })

        db.query(`SELECT * FROM warns WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {

            if (req.length < 1) return message.reply({ content: "Ce membre n'a pas de warn !!", ephemeral: true })
            await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`***LISTE DES WARNS DE ${user.tag}***`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

            for (let i = 0; i < req.length; i++) {
                Embed.addFields([{
                    name: `Warn n${i + 1}`, value: `> **Auteur** : ${(await bot.users.fetch(req[i].authorId)).tag}\n> **ID** : \`${req[i].warn}\`\n> **Raison** :  \`${req[i].reason}\`\n> **Date** : <t:${Math.floor(parseInt(req[i].date) / 1000)}:F> `
                }])
            }
            await message.reply({ embeds: [Embed] })
        })
    }
}