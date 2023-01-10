const Discord = require("discord.js");
const { eval } = require("../.././json/emoji.json");

module.exports = {

    name: "eval",
    description: "Permet de calcule",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "number",
            name: "nombre1",
            description: "Quel est le chiffre ?",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "symbole",
            description: "Quel est le symbole ?",
            required: true,
            autocomplete: true
        },
        {
            type: "number",
            name: "nombre2",
            description: "Quel est le chiffre ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        await message.deferReply()

        let number = args.getNumber("nombre1")
        let number1 = args.getNumber("nombre2")
        let Calcule = args.getString("symbole")

        if (Calcule === "+") {

            calculeEmbed = new Discord.EmbedBuilder()
                .setTitle(`***CALCULE AVEC LE SYMBOLE +***`)
                .setColor("#00A705")
                .setDescription(`> ${eval}  ${number} + ${number1} = ${number + number1}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [calculeEmbed] })

        } else if (Calcule === "-") {

            calculeEmbed = new Discord.EmbedBuilder()
                .setTitle(`***CALCULE AVEC LE SYMBOLE -***`)
                .setColor("#00A705")
                .setDescription(`> ${eval} ${number} - ${number1} = ${number - number1}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            message.followUp({ embeds: [calculeEmbed] })

        } else if (Calcule === "*") {

            calculeEmbed = new Discord.EmbedBuilder()
                .setTitle(`***CALCULE AVEC LE SYMBOLE * ***`)
                .setColor("#00A705")
                .setDescription(`${eval} ${number} * ${number1} = ${number * number1}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [calculeEmbed] })

        } else if (Calcule === "%") {

            calculeEmbed = new Discord.EmbedBuilder()
                .setTitle(`***CALCULE AVEC LE SYMBOLE %***`)
                .setColor("#00A705")
                .setDescription(`> ${eval} ${number} % ${number1} = ${number % number1}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [calculeEmbed] })

        } else if (Calcule === "/") {

            calculeEmbed = new Discord.EmbedBuilder()
                .setTitle(`***CALCULE AVEC LE SYMBOLE /***`)
                .setColor("#00A705")
                .setDescription(`> ${eval} ${number} / ${number1} = ${number / number1}`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [calculeEmbed] })

        } else if (Calcule === "+" || "-" || "*" || "/") {

            let mauvais = new Discord.EmbedBuilder()
                .setTitle(`${eval} ***__Les category des Symbole dispo__*** ${eval}`)
                .setColor("#000000")
                .setDescription("Les choix de Symbole dispo sont : \n\n \`+\` \`-\` \`/\` \`*\` \`%\`")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: "Symbole" })
            return await message.followUp({ embeds: [mauvais] })
        }
    }
}
