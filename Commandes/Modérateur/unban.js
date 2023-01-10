const Discord = require("discord.js");
const { serveurE, modoE, textE, userE, banE } = require("../.././json/emoji.json");

module.exports = {

    name: "unban",
    description: "Permet de unban un membre",
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
            description: "Quel est le raison ?",
            required: true,
            autocomplete: false

        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.reply({ content: "Pas de membre à unban !!", ephemeral: true })

        let reason = args.get("raison").value;
        if (!reason) reason = "Pas de raison fournie !!";

        if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply({ content: "ce membre est pas ban", ephemeral: true })

        let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`***LE MEMBRE A ÉTAIS UNBAN***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${banE} **__UnBan__**
                > ${modoE}**Modérateur :** \`${message.user.tag}\` a unban **avec succès ! ✅**
                > ${userE}**Membre :** \`${user.tag}\` 
                > ${textE}**Raison : \`${reason}\``)
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [Embed] })
        await message.guild.members.unban(user, reason)
    }
}