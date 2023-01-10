const Discord = require("discord.js");
const { infoE } = require("../.././json/emoji.json");

module.exports = {

    name: "help",
    description: "Permet de voir les commandes du bot",
    permission: "Aucune",
    dm: true,
    category: "👆🏻Information",

    async run(bot, message, args) {

        await message.deferReply()

        let categories = [];
        bot.commands.forEach(command => {
            if (!categories.includes(command.category)) categories.push(command.category)
        })

        let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`***LISTE DES COMMANDES DU BOT***`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${infoE} Commandes disponibles : \`${bot.commands.size}\`\n${infoE} Categories disponibles : \`${categories.length}\``)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()

        await categories.sort().forEach(async cat => {

            let commands = bot.commands.filter(cmd => cmd.category === cat)
            Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
        })

        await message.editReply({ embeds: [Embed] })
    }
}
