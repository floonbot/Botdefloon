const Discord = require('discord.js');
const { stopE, modoE, textE, gaming, userE } = require("../.././json/emoji.json");

module.exports = {

    name: "black-list-add",
    description: "Permet de mettre un membre dans la blacklist",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre ?",
            required: true
        },
        {
            type: "string",
            name: "id",
            description: "Quel est l'id du membre ?",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "pseudo",
            description: "Quel est le pseudo du membre, dans le jeux ?",
            required: false,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Quel est la raison ?",
            required: false,
            autocomplete: false
        }, {
            type: "string",
            name: "jeux",
            description: "Quel est le jeux ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if (!user) return message.reply({ content: "Pas de membre à blacklister !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "Pas de membre à blacklister !!", ephemeral: true })

        let pseudo = args.getString("pseudo")
        if (!pseudo) pseudo = "Pas de pseudo"

        let jeux = args.getString("jeux")
        if (!jeux) jeux = "Pas de jeux"

        let reason = args.getString("raison")
        if (!reason) reason = "Aucune raison donnée";

        if (message.user.id === user.id) return message.reply({ content: "N'essayes pas de te blacklister !!", ephemeral: true })
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne blacklist pas le propriétaire du serveur !!", ephemeral: true })
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas blacklister cette personne !!", ephemeral: true })
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le bot ne peut pas blacklister cette personne !!")

        let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`***LE MEMBRE EST BIEN DANS LA BLACK LISTE***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${stopE} **__Black list__** 
            
            > ${modoE} **Modérateur :** \`${message.user.tag}\`
            > ${userE} **Membre qui est black list :** \`${user.tag}\`
            > ${textE} **Raison :** \`${reason}\`
            > ${gaming} **Jeux :** \`${jeux}\`
            > ${userE} **Pseudo :** \`${pseudo}\``)
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [Embed] })

        const addRole = member.guild.roles.cache.find(r => r.name === "Black list")
        if (!addRole) {
            const addRole = await member.guild.roles.create({
                name: 'Black list', color: "Black"
            });
            await member.roles.add(addRole);
        } else {
            member.roles.add(addRole)
        }

        let ID = await bot.fonction.createId("BLACKLIST")
        db.query(`INSERT INTO blacklists (guildId, guild, user, usertag, pseudo, jeux, author, blacklist, reason) VALUES ('${message.guild.id}', '${message.guild.name}', '${user.id}', '${user.tag}', '${pseudo}', '${jeux}', '${message.user.tag}', '${ID}', '${reason.replace(/'/g, "\\'")}')`)
    }
}

