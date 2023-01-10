const Discord = require('discord.js');
const { avatar } = require("../.././json/emoji.json");

module.exports = {

    name: "avatar",
    description: "Permet de récupérer l'avatar d'un membre",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "user",
            name: "utlisateur",
            description: "Quel est l'avatar ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser(`utlisateur`)
        if (!user) return message.reply({ content: "Utlisateur non valide ou mal définie !!", ephemeral: true })

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
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        message.reply({ embeds: [avatarEmbed], components: [row] })
    }
}