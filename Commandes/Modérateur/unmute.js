const Discord = require("discord.js");
const { serveurE, muteE, modoE, userE, textE } = require("../.././json/emoji.json");

module.exports = {

    name: "unmute",
    description: "Permet d'enlever le mute d'un membre",
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
        }, {
            type: "string",
            name: "raison",
            description: "Quel est la raison ?",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.reply({ content: "Pas de membre à unmute !!", ephemeral: true })
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply({ content: "Pas de membre !!", ephemeral: true })

        let reason = args.getString("raison")
        if (!reason) reason = "Pas de raison fournie !";

        if (!member.moderatable) return message.reply({ content: "Je ne peux pas unmute ce membre !!", ephemeral: true })
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas umute cette personne")
        if (!member.isCommunicationDisabled()) return message.reply({ content: "Ce membre est pas mute !!", ephemeral: true })

        try {

            let unMuteEmbed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`***UNMUTE PAR ${message.user.tag}***`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`${muteE} **__Unmute__**
                
                > ${serveurE} **Serveur :**\`${message.guild.name}\`
                > ${modoE} **Modérateur :**\`${message.user.tag}\`\n 
                > ${textE} **Raison :** \`${reason}\``)
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await user.send({ embeds: [unMuteEmbed] })

        } catch (err) { return }

        let unMuteEmbed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`LE MEMBRE A ÉTAIS UNMUTE`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${muteE} **__Unmute__** 

            > ${modoE} **Modérateur :**\`${message.user.tag}\`
            > ${userE} **Membre :** \`${user.tag}\` 
            > ${textE} **Raison :** \`${reason}\``)
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [unMuteEmbed] })

        await member.timeout(null, reason)
    }
}
