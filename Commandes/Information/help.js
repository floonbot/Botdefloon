const Discord = require("discord.js");
const { Sos, infoE, Emojibot } = require("../.././json/emoji.json");

module.exports = {

  name: "help",
  description: "Affiche les commandes du floonbot",
  permission: "Aucune",
  dm: true,
  category: "👆🏻Information",

  async run(bot, message, args) {

    await message.deferReply()


    let categories = [];
    bot.commands.forEach(command => {
      if (!categories.includes(command.category)) categories.push(command.category)
    })

    let botEmbed = new Discord.EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande bot-list !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${Emojibot} **__Je cherche les bots sur le serveur ${message.guild.name}__** ${Emojibot}
    
            > **Sur le serveur :** ${message.guild.name}
             
              \`Veuillez patienter\``)
      .setTimestamp()
      .setFooter({ text: "bot-list" })
    await message.followUp({ embeds: [botEmbed] }).then(async () => {

      let Embed = new Discord.EmbedBuilder()
        .setColor("#0070FF")
        .setTitle(`${Sos} Aide pour les commandes du bot`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${infoE} Commandes disponibles : \`${bot.commands.size}\`\n${infoE} Categories disponibles : \`${categories.length}\``)
        .setTimestamp()

      await categories.sort().forEach(async cat => {

        let commands = bot.commands.filter(cmd => cmd.category === cat)
        Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
      })

      setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
    })
  }
}
