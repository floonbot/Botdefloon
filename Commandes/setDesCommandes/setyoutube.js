const Discord = require("discord.js");
const { logE } = require("../.././json/emoji.json")
const { AttachmentBuilder } = require("discord.js")
const { png } = require("../../json/saveImage/png.json");


module.exports = {

  name: "setyoutube",
  description: "Paramètre les commandes sur le serveur",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  dm: false,
  category: "🗃️Set des commande",
  options: [
    {
      type: "string",
      name: "état",
      description: "Quel est l'état ?",
      required: true,
      autocomplete: true
    },
    {
      type: "string",
      name: "lien",
      description: "Quel est la chaine ?",
      required: false,
      autocomplete: false
    },
  ],
  async run(bot, message, args, db,) {

    let etat = args.getString("état")
    let youtube = args.getString("lien");

    if (etat === "on" && args.getString("lien") === null) return message.reply({ content: "Merci de mettre un lien !!", ephemeral: true })

    if (etat === "on" && !args.getString("lien").match(new RegExp(/(https?:\/\/)?(www\.)?youtu((\.be)|(be\..{2,5}))\/((user)|(channel))\/?([a-zA-Z0-9\-_]{1,})/))) {

      await message.deferReply({ ephemeral: true })

      const file = new AttachmentBuilder(`./assets/${png}`, { name: `image.png` })

      let mauvais = new Discord.EmbedBuilder()
        .setTitle(`**Merci de mettre une url youtbe**`)
        .setColor("#000000")
        .setImage(`attachment://${file.name}`)
        .setDescription("**__Exemple__**")
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setTimestamp()
        .setFooter({ text: "setyoutbe" })
      return await message.followUp({ embeds: [mauvais], files: [file] })
    }

    await message.deferReply()

    const cEmbed = new Discord.EmbedBuilder()
      .setColor("#FF5D00")
      .setTitle(`Chargement de la commande setcommandes !!`)
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
      .setDescription(`${logE} **__Je suis entrain de set la commande__** 
      
                  > **Sur le serveur :** ${message.guild.name}
                  
                  \`Veuillez patienter\``)
      .setTimestamp()
      .setFooter({ text: "setcommandes" })

    if (etat !== "on" && etat !== "off") {

      let mauvais = new Discord.EmbedBuilder()
        .setTitle(`**__Les set commandes disponible __**`)
        .setColor("#000000")
        .setDescription(`${infoE} Les choix sont : \`off\` et \`on\``)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: "setcommande" })
      return await message.followUp({ embeds: [mauvais] })
    }

    if (etat === "off") {
      db.query(`UPDATE pub SET active = 'false' WHERE guild = '${message.guildId}'`)

      return await message.followUp({ embeds: [cEmbed] }).then(() => {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#FFE800")
          .setTitle(`SetYoutube`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`Le setyoutube est bien désactiver`)
          .setTimestamp()
          .setFooter({ text: "SetYoutube" })
        setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
      })

    } else if (etat === "on") {

      db.query(`UPDATE pub SET active = 'true' WHERE guild = '${message.guildId}'`)
      db.query(`UPDATE pub SET youtube = '${youtube}' WHERE guild = '${message.guildId}'`)

      return await message.followUp({ embeds: [cEmbed] }).then(() => {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#FFE800")
          .setTitle(`SetYoutube`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`Le setyoutube est bien activé`)
          .setTimestamp()
          .setFooter({ text: "SetYoutube" })
        setTimeout(async () => await message.editReply({ embeds: [Embed] }), 2000)
      })
    }
  }
}

