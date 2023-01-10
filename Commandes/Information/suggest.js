const Discord = require("discord.js");
const { idée } = require("../.././json/emoji.json");

module.exports = {

    name: "suggest",
    description: "Permet d'envoyer une suggestion",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",
    options: [
        {
            type: "string",
            name: "texte",
            description: "Quel est la suggestion ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guildId = '${message.guild.id}'`, async (err, req) => {

            try {

                if (req.length < 1 || Boolean(req[0].suggest) === false) { return message.reply({ content: "Veuiller active le setcommande sur on pour la commande suggest !!", ephemeral: true }) }

                db.query(`SELECT * FROM serverchannel WHERE guildId = '${message.guild.id}'`, async (err, req) => {

                    let channel = bot.channels.cache.get(req[0].suggestS)
                    if (!channel) { return message.reply({ content: "Pas de salon pour la suggestion fait un /setsuggest !! ", ephemeral: true }) };

                    let msg = args.getString("texte");

                    message.reply({ content: "La suggestion est bien envoyer !!", ephemeral: true })

                    const EmbedMessage = new Discord.EmbedBuilder()

                        .setTitle(`***NOUVELLE SUGGESTION***`)
                        .setColor("#0070FF")
                        .setThumbnail(message.user.displayAvatarURL({ dynamic: true, size: 64 }))
                        .setDescription(`${idée} **__Suggestion__**

                    > ${message.user} : ${msg}`)
                        .setTimestamp()
                        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                    channel.send({ embeds: [EmbedMessage] }).then(function (message) {
                        message.react("✅")
                        message.react("❌")
                    })
                })
            } catch (err) {

                message.reply({ content: "Le serveur n'est pas encore enregistrer, veuillez écrire un message !!", ephemeral: true })

            }
        })
    }
}