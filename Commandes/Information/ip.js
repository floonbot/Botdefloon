const libquery = require('libquery');
const Discord = require("discord.js");

module.exports = {

	name: "ip",
	description: "Permet d'avoir l'ip du serveur",
	permission: "Aucune",
	dm: false,
	category: "ππ»Information",

	async run(bot, message) {

		await message.deferReply()

		libquery.query(`sulfuritium.fr`, 19132, 1000).then((data) => {
			const onembed = new Discord.EmbedBuilder()
				.setTitle(`Statut`)
				.setColor("#0070FF")
				.setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
				.setDescription(`> π‘ | Statut: **Online (π’)**
        > π | IP: sulfuritium.fr
        > π | Port: 19132
        > π₯ | Nombre de joueur en ligne: **${data.online}/${data.max}**`)
				.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
				.setTimestamp()
			message.editReply({ embeds: [onembed] })
		}).catch(() => {
			const offembed = new Discord.EmbedBuilder()
				.setTitle(`Statut`)
				.setColor("#0070FF")
				.setThumbnail(url = "https://cdn.discordapp.com/attachments/837807770395869195/944521377334063124/MOSHED-2022-2-5-10-43-29.gif")
				.setDescription(`> π‘ | Statut: **Offline (π΄)**
        > π | IP: sulfuritium.fr
        > π | Port: 19132
        > π₯ | Nombre de joueur en ligne: **??/??**`)
				.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
				.setTimestamp()
			message.editReply({ embeds: [offembed] })
		})
	}
}
