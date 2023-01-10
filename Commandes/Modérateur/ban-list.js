const Discord = require("discord.js");

module.exports = {

    name: "ban-list",
    description: "Permet d'afficher les bans",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",


    async run(bot, message, args, db) {

        const fetchBans = await message.guild.bans.fetch();

        const banlist = (await fetchBans).map((member) => member.user.tag).join(`\n`)

        if (banlist.length < 1) return Error(message, "Il n'y a pas de personnes banni(s) dans ce serveur !")

        let Embed = new Discord.EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`***lES MEMBRES BAN***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`\`${banlist}\``)
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.reply({ embeds: [Embed] })
    }
}