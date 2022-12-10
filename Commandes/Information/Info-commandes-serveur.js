const Discord = require("discord.js");
const { infoE, serveurE } = require("../../json/emoji.json");

module.exports = {

    name: "info-commandes-serveur",
    description: "Affiche les commandes on ou off sur le serveur",
    permission: "Aucune",
    dm: true,
    category: "👆🏻Information",

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guildId = '${message.guildId}'`, async (err, req) => {

            await message.deferReply()
            try {
                
                let botEmbed = new Discord.EmbedBuilder()
                    .setColor("#FF5D00")
                    .setTitle(`Chargement des commandes sur le serveur !!`)
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setDescription(`${infoE} **__Je cherche les commandes sur on ou off__** ${infoE}

      > **Sur le serveur :** ${message.guild.name}
       
        \`Veuillez patienter\``)
                    .setTimestamp()
                    .setFooter({ text: "Commandes" })

                await message.followUp({ embeds: [botEmbed] }).then(() => {

                    let Embed = new Discord.EmbedBuilder()
                        .setColor("#FF0000")
                        .setTitle(`La list des commandes serveur sur on ou off`)
                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                        .setTimestamp()
                        .setFooter({ text: "Commandes" })
                        .setDescription(`
                ${serveurE} **__Les commandes sur on ou off__** 
                
                > **Pub :** \`${req[0].pub}\`
                > **Captcha :** \`${req[0].captcha}\`
                > **Logs :** \`${req[0].logs}\`
                > **Suggest :** \`${req[0].suggest}\`
                > **Antiraid :** \`${req[0].antiraid}\`
                > **Welcome :** \`${req[0].welcome}\`
                > **Goodbye :** \`${req[0].goodbye}\`
                > **Antispam :** \`${req[0].antispam}\``)

                    setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
                })
            } catch (err) {

                message.editReply("Oups une erreur est survenue")

            }
        })
    }
}



