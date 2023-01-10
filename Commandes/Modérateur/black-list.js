const Discord = require("discord.js");
const { serveurE, userE, gaming, textE } = require("../.././json/emoji.json");

module.exports = {

	name: "black-list",
	description: "Permet d'afficher la black liste",
	permission: Discord.PermissionFlagsBits.ModerateMembers,
	dm: false,
	category: "🧑🏻‍⚖️Modération",

	async run(bot, message, args, db) {

		db.query(`SELECT * FROM blacklists WHERE guildId = '${message.guildId}'`, async (err, req) => {

			let embed_description = ""
			let Embed = new Discord.EmbedBuilder()
				.setColor("#FF0000")
				.setTitle(`***LES MEMBRES DANS LA BLACK LISTE***`)
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
				.setTimestamp()
				.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

			for (let i = 0; i < req.length; i++) {
				embed_description = embed_description + `

                    > ${serveurE} **Serveur :** \`${req[i].guild}\`
                    > ${userE} **Membre :** \`${req[i].usertag} \`
                    > ${userE} **Pseudo dans le jeux :** \`${req[i].pseudo}\`
                    > ${gaming} **Jeux :** \`${req[i].jeux}\`
                    > ${textE} **Raison :** \`${req[i].reason}\``
			}

			if (embed_description === "") {
				embed_description = "La blackliste est vide !"
			}
			Embed.setDescription(embed_description)
			await message.reply({ embeds: [Embed] })
		})
	}
}