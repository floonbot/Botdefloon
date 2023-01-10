const Discord = require('discord.js');
const { avatar } = require("../.././json/emoji.json");

module.exports = {

	name: "avatar-random",
	description: "Permet de récupérer l'avatar d'un membre random",
	permission: "Aucune",
	dm: false,
	category: "🥳Fun",

	async run(bot, message, args) {

		const user = bot.users.cache.random()

		let row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setLabel(`Avatar`)
					.setURL(`${user.displayAvatarURL({ dynamic: true })}`)
					.setStyle(Discord.ButtonStyle.Link)
			)

		let avatarEmbed = new Discord.EmbedBuilder()
			.setColor("#00A705")
			.setDescription(`> ${avatar} **__L'avatar du membre ${user.tag}__**`)
			.setImage(user.displayAvatarURL({ dynamic: true }))
		message.reply({ embeds: [avatarEmbed], components: [row] })
	}
}