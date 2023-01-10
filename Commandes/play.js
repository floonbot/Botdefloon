const Discord = require('discord.js')

module.exports = {
 
    name: "play",
	description: "Permet de lancer la musique",
	permission: "Aucune",
	dm: false,
	category: `Musique`,
	options: [
		{
			type: "string",
			name: "musique",
			description: "Quel est le tag ?",
			required: true,
			autocomplete: false
		}
	],
 
    async run(bot, message, args, interaction) {
        try {
 
        let musique = args.getString("musique");
        if(!message.member.voice.channel) return message.reply({ ephemeral: true, content: "Pour utiliser cette commande tu dois rejoindre un salon vocal !!" })
 
        const queue = bot.player.createQueue(message.guild, {metadata: {message: message}})
 
        let track = await bot.player.search(musique, {requestedBy: message.user}).then(track => track.tracks[0]);
        if(!track) return message.reply({ ephemeral: true, content: "La musique n'a pas été trouvée." })
 
        const embed = new Discord.EmbedBuilder()
        .setColor('#5D8FBF')
        .setAuthor({ name: message.user.tag, iconURL: message.user.displayAvatarURL({ dynamic: true, size: 4096 }), url: 'https://discord.gg/EmcrrxBmnt' })
        .setDescription(`🎵 **${track.title}**\n*Cette musique est dans la liste d'attente.*`)
 
        if(!queue.connection) await queue.connect(message.member.voice.channel);
        await queue.play(track);
        await message.reply({ embeds: [embed] })
 
    }  catch (err) {
        await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
      }
    }
};