const translate = require('@iamtraction/google-translate');
const Discord = require("discord.js");

module.exports = {

    name: "traduction",
    description: "Permet de tradruire du text",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "string",
            name: "text",
            description: "Quel est le text ?",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "langue",
            description: "Quel est le language ?",
            required: true,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        const query = args.getString("text")
        const langue = args.getString("langue")

        await message.deferReply()

        if (langue === "fr") {
            const translated = await translate(query, { to: 'fr' });
            return message.followUp(`${translated.text}`)
        }

        if (langue === "ja") {
            const translated = await translate(query, { to: 'ja' });
            return message.followUp(`${translated.text}`)
        }

        if (langue === "en") {
            const translated = await translate(query, { to: 'en' });
            return message.followUp(`${translated.text}`)
        }

        if (langue !== "fr" || langue !== "en" || langue !== "ja") {
            let mauvais = new Discord.EmbedBuilder()
                .setTitle(`👅 ***__LES LANGUES DISPONIBLE__*** 👅`)
                .setColor("#000000")
                .setDescription("Les choix des langues dispo sont : \n\n \`fr\`\n \`en\`\n \`ja\`")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
                .setFooter({ text: "traduction" })
            return await message.followUp({ embeds: [mauvais] })
        }
    }
}

