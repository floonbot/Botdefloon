const Discord = require("discord.js");
const { infoE } = require("../.././json/emoji.json");

module.exports = {

    name: "bot-info",
    description: "Les informations sur le bot",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi")
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Actualiser")
                    .setStyle(Discord.ButtonStyle.Success)
                    //Mettre le lien de ton bot
                    .setCustomId("bot-info")
            )

        const botEmbed = new Discord.EmbedBuilder()
            .setTitle(`***LES INFORMATIONS DE ${bot.user.username}***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setColor("#0070FF")
            .setDescription(`
                __**${infoE} Informations**__

                > **Développer :** \`Floon\`
                > **Name / Tag :** \`${bot.user.username}\`
                > **Tag :** \`${bot.user.discriminator}\`
                > **Ping :** \`${bot.ws.ping}\`
                > **Temps Uptime :** ${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}
               
                __ **${infoE} Information Compte ** __

                > **Créer :** <t:${parseInt(bot.user.createdTimestamp / 1000)}:R>`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        message.reply({ embeds: [botEmbed], components: [row] })
    }
}