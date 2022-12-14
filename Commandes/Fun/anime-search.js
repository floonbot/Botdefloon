const malScraper = require('mal-scraper')
const Discord = require("discord.js")

module.exports = {

    name: "anime-search",
    description: "Permet de voir les informations d'un animer",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "string",
            name: "anime",
            description: "Quel est l'anime ?",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {

        let name = args.getString("anime")

        malScraper.getInfoFromName(name)
            .then((data) => {
                const file = new Discord.AttachmentBuilder(data.picture, { name: `erreur.gif` });
                const malEmbed = new Discord.EmbedBuilder()

                    .setTitle(`Les infomations de ${name} !!`)
                    .setImage(`attachment://${file.name}`)
                    .setDescription(`
                        > **Nombre d'épisodes :** \`${data.episodes}\`
                        > **Temps moyen des épisodes :** \`${data.duration}\`
                        > **Score :** \`${data.score}\`
                        > **Url :** ${data.url}`)
                message.reply({ embeds: [malEmbed], files: [file] });
            }
         )
    }
}