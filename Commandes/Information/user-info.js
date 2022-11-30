const { userE, infoE } = require("../.././json/emoji.json")
const { EmbedBuilder } = require("discord.js");

module.exports = {

  name: "user-info",
  description: "Permet de voir les informations d'un membre",
  dm: false,
  category: "👆🏻Information",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Quel membre ?",
      required: true
    },
  ],

  async run(bot, message) {

    await message.deferReply()

    const member = message.options.getMember("membre");

    let userEmbed = new EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande user-info !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${userE} **__Je cherche les informations du membre__** ${userE}

                > **Sur le serveur :** ${message.guild.name}
     
                 \`Veuillez patienter\``)
      .setFooter({ text: "User-info" })
    await message.followUp({ embeds: [userEmbed] }).then(() => {

      userEmbed = new EmbedBuilder()
        .setTitle(`Info de ${member.user.tag}`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor("#0070FF")
        .setDescription(`
               ${infoE} __**Informations**__

                > **Name/Tag :** \`${member.user.tag}\`,
                > **ID :** \`${member.user.id}\`,
                > **Bot :** ${member.user.bot ? ':white_check_mark:' : '❌'}

                ${infoE}  __ **Information Compte ** __

                > **Créer :** <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
                > **A rejoin :** <t:${parseInt(member.joinedAt / 1000)}:R>`)
        .setFooter({ text: "User-Info" })
      setTimeout(async () => await message.editReply({ embeds: [userEmbed] }), 2000)
    })
  }
}