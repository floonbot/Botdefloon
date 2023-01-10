const Discord = require("discord.js");
const { stopE, modoE, serveurE, userE } = require("../.././json/emoji.json");

module.exports = {

    name: "black-list-remove",
    description: "Permet de supprimer un membre de la blacklist",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre a unblack list",
            required: true
        },
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply({ content: "Pas de membre !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

        db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
            if (req.length <= 0) return message.reply({ content: "Cette personne n'est pas blacklister !!", ephemeral: true })

            db.query(`DELETE FROM blacklists WHERE guildId = '${message.guildId}' AND user = '${user.id}'`)

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`***LE MEMBRE EST BEIN SUPPRIMÉ DE LA BLACK LISTE***`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${stopE} **__Black list__** 
             
            > ${serveurE} **Serveur :**  \`${message.guild.name}\`
            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${userE} **Membre qui est supprimé de la black list :** \`${user.tag}\``)
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.reply({ embeds: [Embed] })

            const removeRole = member.guild.roles.cache.find(r => r.name === "Black list")
            member.roles.remove(removeRole)
        })
    }
}