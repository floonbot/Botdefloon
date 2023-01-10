const Discord = require("discord.js");
const { png } = require("../../json/saveImage/png.json");


module.exports = {

    name: "setyoutube",
    description: "Paramètre les commandes sur le serveur",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🗃️Set des commande",
    options: [
        {
            type: "string",
            name: "état",
            description: "Quel est l'état ?",
            required: true,
            autocomplete: true
        },
        {
            type: "string",
            name: "lien",
            description: "Quel est la chaine ?",
            required: false,
            autocomplete: false
        },
    ],
    async run(bot, message, args, db,) {

        let etat = args.getString("état")
        let youtube = args.getString("lien");

        if (etat === "on" && args.getString("lien") === null) return message.reply({ content: "Merci de mettre un lien !!", ephemeral: true })

        if (etat === "on" && !args.getString("lien").match(new RegExp(/(https?:\/\/)?(www\.)?youtu((\.be)|(be\..{2,5}))\/((user)|(channel))\/?([a-zA-Z0-9\-_]{1,})/))) {

            await message.deferReply({ ephemeral: true })

            const file = new Discord.AttachmentBuilder(`./assets/${png}`, { name: `image.png` })

            let mauvais = new Discord.EmbedBuilder()
                .setTitle(`**Merci de mettre une url youtbe**`)
                .setColor("#000000")
                .setImage(`attachment://${file.name}`)
                .setDescription("**__Exemple__**")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: "setyoutbe" })
            return await message.followUp({ embeds: [mauvais], files: [file] })
        }

        await message.deferReply()

        if (etat !== "on" && etat !== "off") {

            let mauvais = new Discord.EmbedBuilder()
                .setTitle(`**__Les set commandes disponible __**`)
                .setColor("#000000")
                .setDescription(`${infoE} Les choix sont : \`off\` et \`on\``)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ text: "setcommande" })
            return await message.followUp({ embeds: [mauvais] })
        }

        if (etat === "off") {
            db.query(`UPDATE server SET pub = 'false' WHERE guildId = '${message.guildId}'`)

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FFE800")
                .setTitle(`SetYoutube`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`Le setyoutube est bien désactiver`)
                .setTimestamp()
                .setFooter({ text: "SetYoutube" })
            await message.editReply({ embeds: [Embed] })

        } else if (etat === "on") {

            db.query(`UPDATE server SET pub = 'true' WHERE guildId = '${message.guildId}'`)
            db.query(`UPDATE server SET lienYoutube = '${youtube}' WHERE guildId = '${message.guildId}'`)

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FFE800")
                .setTitle(`SetYoutube`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setDescription(`Le setyoutube est bien activé`)
                .setTimestamp()
                .setFooter({ text: "SetYoutube" })
            await message.editReply({ embeds: [Embed] })
        }
    }
}

