const Discord = require("discord.js");
const { textE } = require("../.././json/emoji.json");

module.exports = {

	name: "dm",
	description: "Permet de dm un membre",
	category: "🧑🏻‍⚖️Modération",
	permission: Discord.PermissionFlagsBits.ModerateMembers,
	dm: false,
	options: [
		{
			name: "membre",
			type: "user",
			description: "Quel est le membre ?",
			required: true,
			autocomplete: false
		},
		{
			name: "texte",
			type: "string",
			description: "Quel est le sujet ?",
			required: true,
			autocomplete: false
		}
	],

	async run(bot, interaction) {

		let user = await interaction.options.getUser("membre");
		let reason = interaction.options.getString("texte")

		try {

			await interaction.deferReply({ ephemeral: true })

			await interaction.followUp("J'ai bien envoyer le message")

			let Embed1 = new Discord.EmbedBuilder()
				.setColor("#00A705")
				.setTitle(`***MESSAGE DE ${bot.user.tag}***`)
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
				.setDescription(`> ${textE}**Message :** ${reason}`)
				.setTimestamp()
				.setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
			await user.send({ embeds: [Embed1] })

		} catch (err) {

			interaction.followUp("Le membre à fermer ses mp")

		}
	}
}