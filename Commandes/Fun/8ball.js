const Discord = require("discord.js");
const { huitball, vraisfaux, } = require("../../json/emoji.json");

module.exports = {

	name: "8ball",
	description: "Permet de posé une question",
	permission: "Aucune",
	dm: false,
	category: "🥳Fun",
	options: [
		{
			type: "string",
			name: "question",
			description: "Quel est la question ?",
			required: true,
			autocomplete: false
		}
	],

	async run(bot, message, args) {

		let quest = args.getString("question")
		let result = ["Oui", "Non", "Peut-être"][Math.floor(Math.random() * ["Oui", "Non", "Peut-être"].length)];

		const ballEmbed = new Discord.EmbedBuilder()
			.setTitle(`***LA RÉPONSE À LA QUESTION***`)
			.setColor("#00A705")
			.addFields(
				{ name: `${huitball} **Question**`, value: `> ${quest}`, inline: false },
				{ name: `${vraisfaux} **Reponse**`, value: `> ${result}`, inline: false },
			)
			.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
			.setTimestamp()
			.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
		message.reply({ embeds: [ballEmbed] })
	}
}