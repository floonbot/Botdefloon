const malScraper = require('mal-scraper');
const Discord = require("discord.js");
const {animeE } = require("../.././json/emoji.json");

module.exports = {

    name: "anime-search",
    description: "Permet de voir les informations d'un animer",
    permission: "Aucune",
    dm: false,
    category: `${animeE}Anime`,
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
                const file = new Discord.AttachmentBuilder(data.picture, { name: `erreur.gif` })
                const malEmbed = new Discord.EmbedBuilder()

                    .setTitle(`***${data.title}***`)
                    .setImage(`attachment://${file.name}`)
                    .setColor("#00A705")
                    .setDescription(`
                        > **Nombre d'épisodes :** \`${data.episodes}\`
                        > **Temps moyen des épisodes :** \`${data.duration}\`
                        > **Score :** \`${data.score}\`
                        > **Url :** ${data.url}`)
                    .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                message.reply({ embeds: [malEmbed], files: [file] })
            })
    }
}