const Discord = require("discord.js");
const { infoE } = require("../.././json/emoji.json");

module.exports = {

	name: "user-info",
	description: "Permet de voir les informations d'un membre",
	dm: false,
	category: "👆🏻Information",
	options: [
		{
			type: "user",
			name: "membre",
			description: "Quel membre ?",
			required: true
		},
	],

	async run(bot, message) {

		const member = message.options.getMember("membre");

		const userEmbed = new Discord.EmbedBuilder()
			.setTitle(`***INFO DE ${member.user.tag}***`)
			.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
			.setColor("#0070FF")
			.setDescription(`
               ${infoE} __**Informations**__

                > **Name/Tag :** \`${member.user.tag}\`,
                > **ID :** \`${member.user.id}\`,
                > **Bot :** ${member.user.bot ? ':white_check_mark:' : '❌'}

                ${infoE}  __ **Information Compte ** __

                > **Créer :** <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
                > **A rejoin :** <t:${parseInt(member.joinedAt / 1000)}:R>`)
			.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
		await message.reply({ embeds: [userEmbed] })
	}
}