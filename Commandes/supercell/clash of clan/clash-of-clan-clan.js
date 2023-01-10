const Discord = require("discord.js");
const config = require("../../../config")
const { Client } = require("clashofclans.js");
const client = new Client({ keys: [config.Api] }); //Pour l'api https://developer.clashofclans.com/#/account
const { logoclan, supercellLogo } = require("../../../json/emoji.json");

module.exports = {

	name: "clash-of-clan-clan",
	description: "Permet de voir les informations du clan",
	permission: "Aucune",
	dm: false,
	category: `${supercellLogo}Supercell`,
	options: [
		{
			type: "string",
			name: "tag",
			description: "Quel est le tag ?",
			required: true,
			autocomplete: false
		}
	],

	async run(bot, message, args) {

		(async function () {

			try {
				let tag = args.getString("tag")

				const data = await client.clan(tag)
				const malEmbed = new Discord.EmbedBuilder()
					.setTitle("***Clash of clan***")
					.setColor("#00A705")
					.setDescription(`

            ${logoclan}  **Les informations du clan :**

                    > **Name :** \`${data.name}\`
                    > **Nombre de membre :** \`${data.members}\`
                    > **Ouvert ou fermer :** \`${data.type}\`
                    > **Langue:** \`${data.location.name}\`
                    > **requiredTrophies :** \`${data.requiredTrophies}\`
                    > **Nombre de gdc gagnée :** \`${data.warWins}\`
                    > **Nombre de gdc perdues :** \`${data.warLosses}\``)
					.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
					.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

				message.reply({ embeds: [malEmbed] })

			} catch (err) { message.reply("Mettre le tag du clan") }
		})()
	}
}