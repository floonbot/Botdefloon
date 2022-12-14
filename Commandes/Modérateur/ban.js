const Discord = require("discord.js");
const { banE, serveurE, modoE, textE } = require("../.././json/emoji.json");

module.exports = {

	name: "ban",
	description: "Permet de ban le membre",
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
			description: "Quel est la raison ?",
			required: true,
			autocomplete: false
		}
	],
	async run(bot, message, args, db, member) {

		let user = await bot.users.fetch(args._hoistedOptions[0].value)
		if (!user) return message.reply({ content: "Pas de membre à bannir !!", ephemeral: true })

		let reason = args.get("raison").value;
		if (!reason) reason = "Pas de raison fournie pour ban le membre !!";

		if (message.user.id === user.id) return message.reply({ content: "Essaie pas de te bannir !!", ephemeral: true })
		if ((await message.guild.fetchOwner()).id === user.id) return message.reply({ content: "Ne ban pas le propriétaire du serveur !!", ephemeral: true })
		if (member && !member.bannable) return message.reply({ content: "Je ne peux pas bannir ce membre !!", ephemeral: true })
		if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas bannir cette personne !!", ephemeral: true })
		if ((await message.guild.bans.fetch()).get(user.id)) return message.reply({ content: "Ce membre est déja ban !!", ephemeral: true })

		try {

			let Embed = new Discord.EmbedBuilder()
				.setColor("#FF0000")
				.setTitle(`***BAN PAR ${message.user.tag}***`)
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
				.setDescription(`${banE} **__Ban__**
                    
                    > ${serveurE} **Serveur :** \`${message.guild.name}\`,
                    > ${modoE} **Modérateur :** \`${message.user.tag} \`,
                    > ${textE} **Raison :** \`${reason}\`!`)
				.setTimestamp()
				.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
			await user.send({ embeds: [Embed] })

		} catch (err) { return }

		let Embed = new Discord.EmbedBuilder()
			.setColor("#FF0000")
			.setTitle(`***LE MEMBRE A BIEN ÉTAIS BAN***`)
			.setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
			.setDescription(`${banE} **__Ban__** 
                
                > ${modoE} **Modérateur :** \`${message.user.tag}\`
                > ${banE} **Membre qui est ban :** \`${user.tag}\`
                > ${textE} **Raison :** \`${reason}\``)
			.setTimestamp()
			.setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
		await message.reply({ embeds: [Embed] })

		await message.guild.bans.create(user.id, { reason: reason })

		let ID = await bot.fonction.createId("BAN")

		db.query(`INSERT INTO bans (guild, guildId, user, userId, author, authorId, ban, reason, date) VALUES ('${message.guild.name}', '${message.guild.id}','${user.tag}', '${user.id}','${message.user.tag}','${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
	}
}
