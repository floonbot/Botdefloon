const Discord = require("discord.js");
const { serveurE } = require("../../json/emoji.json");

module.exports = {

    name: "info-commandes-serveur",
    description: "Permet de voir les commandes sur off ou true",
    permission: "Aucune",
    dm: true,
    category: "👆🏻Information",

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guildId = '${message.guildId}'`, async (err, req) => {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#FF0000")
                .setTitle(`***LISTE DES COMMANDES SUR ON OU OFF***`)
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
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.reply({ embeds: [Embed] })
        })
    }
}



