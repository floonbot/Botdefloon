const Discord = require("discord.js");
const { AttachmentBuilder } = require("discord.js");
const { gifE, animeE } = require("../../json/emoji.json");
const { punch } = require("../../json/GIF_D'ANIME/punch.json");
const { kiss } = require("../../json/GIF_D'ANIME/kiss.json");
const { badass } = require("../../json/GIF_D'ANIME/badass.json");
const { kill } = require("../../json/GIF_D'ANIME/kill.json");
const { autres } = require("../../json/GIF_D'ANIME/autres.json");

module.exports = {

	name: "gif",
	description: "Permet de effectuer un gif",
	permission: "Aucune",
	dm: false,
	category: `${animeE}Anime`,
	options: [
		{
			type: "string",
			name: "gif-a-choisir",
			description: "Quel est le gif ?",
			required: true,
			autocomplete: true,
		},
		{
			type: "user",
			name: "membre",
			description: "Quel utilisateur ?",
			required: false,
			autocomplete: false
		},
		{
			type: "string",
			name: "raison",
			description: "Quelle raison ?",
			required: false,
			autocomplete: false
		}
	],

	async run(bot, message, args) {

		let choix = args.getString("gif-a-choisir")
		const member = message.options.getMember("membre");
		let reason = args.getString("raison");

		await message.deferReply()

		if (!member && reason) {

			const file = new AttachmentBuilder(`./assets/gif/autres/${autres}`, { name: `erreur.gif` })

			const Embed = new Discord.EmbedBuilder()
				.setDescription("Le gif choisie ne peut être reçus car il peux pas avoir de raison fournie sans le membre définie !!")
				.setColor("#001540")
				.setImage(`attachment://${file.name}`)
			return await message.followUp({ embeds: [Embed], files: [file] })

		}

		if (choix === "punch") {

			let punchradom = Math.floor(Math.random() * punch.length);
			let motRandom = punch[punchradom];
			const file = new AttachmentBuilder(`./assets/gif/punch/${motRandom}`, { name: `Punch.gif` })

			if (!member) {

				const Embed = new Discord.EmbedBuilder()

					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && reason) {

				const Embed = new Discord.EmbedBuilder()

					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a punch ${member.user.toString()} pour la raison : \n\`${reason}\``)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && !reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a punch ${member.user.toString()}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })
			}
		}

		if (choix === "kiss") {

			let kissradom = Math.floor(Math.random() * kiss.length);
			let kissmotRandom = kiss[kissradom];
			const file = new AttachmentBuilder(`./assets/gif/kiss/${kissmotRandom}`, { name: `kiss.gif` })

			if (!member) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a kiss ${member.user.toString()} pour la raison : \n\`${reason}\``)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && !reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a kiss ${member.user.toString()}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })
			}
		}

		if (choix === "badass") {

			let badassradom = Math.floor(Math.random() * badass.length);
			let badassmotRandom = badass[badassradom];
			const file = new AttachmentBuilder(`./assets/gif/badass/${badassmotRandom}`, { name: `badass.gif` })

			if (!member) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && !reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} met la pression à  ${member.user.toString()}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} met la pression à ${member.user.toString()} pour la raison : \n\`${reason}\``)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })
			}
		}

		if (choix === "kill") {

			let killradom = Math.floor(Math.random() * kill.length);
			let killmotRandom = kill[killradom];
			const file = new AttachmentBuilder(`./assets/gif/kill/${killmotRandom}`, { name: `kill.gif` })

			if (!member) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && !reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a kill ${member.user.toString()}`)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })

			} else if (member && reason) {

				const Embed = new Discord.EmbedBuilder()
					.setColor("DC00FF")
					.setImage(`attachment://${file.name}`)
					.setDescription(`${message.user.toString()} a kill ${member.user.toString()} pour la raison : \n\`${reason}\``)
					.setTimestamp()
				return await message.followUp({ embeds: [Embed], files: [file] })
			}
		}

		if (choix !== "kill" || choix !== "badass" || choix !== "kiss" || choix !== "punch") {
			let mauvais = new Discord.EmbedBuilder()
				.setTitle(`${gifE} **__Les category des gif dispo__** ${gifE}`)
				.setColor("#000000")
				.setDescription("Les choix de gif dispo sont : \n\n \`kiss\`\n \`kill\`\n \`badass\`\n \`punch\`")
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
				.setTimestamp()
				.setFooter({ text: "gif" })
			return await message.followUp({ embeds: [mauvais] })
		}

	}
}