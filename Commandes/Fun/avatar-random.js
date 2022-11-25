const Discord = require('discord.js');
const fs = require("fs");
const { avatar } = require("../.././json/emoji.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

  name: "avatar-random",
  description: "Permet de récupérer l'avatar d'un membre random",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",

  async run(bot, message, args) {

    try {

      const user = bot.users.cache.random()

      await message.deferReply()

      let row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel(`Avatar`)
            .setURL(`${user.displayAvatarURL({ dynamic: true })}`)
            .setStyle(ButtonStyle.Link)
        )

      let avatarEmbed = new Discord.EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande avatar-random !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${avatar} **__Je cherche l'avatar du membre__** ${avatar}
                
                > **Sur le serveur :** ${message.guild.name}

                \`Veuillez patienter\``)
        .setTimestamp()
        .setFooter({ text: "avatar-random" })
      await message.followUp({ embeds: [avatarEmbed] }).then(() => {

        avatarEmbed = new EmbedBuilder()
          .setColor("#00A705")
          .setDescription(`> ${avatar} **__L'avatar du membre ${user.tag}__**`)
          .setImage(user.displayAvatarURL({ dynamic: true }))
        setTimeout(() => message.editReply({ embeds: [avatarEmbed], components: [row] }), 2000);
      })

    } catch (err) {
      console.log(`
      >------------ OUPS UNE ERREUR ------------<
      
      UNE ERREUR DANS LA COMMANDE AVATAR-RANDOM !!

      >--------------- L'ERREUR ----------------<

      ${err}
      
      >-----------------------------------------<
      `)
      fs.writeFile("./erreur.txt", `${err.stack}`, () => { return })
      let channel = await bot.channels.cache.get("1041816985920610354")
      channel.send({ content: `⚠️ UNE ERREUR SUR LA COMMANDE AVATAR-RANDOM !!`, files: [{ attachment: './erreur.txt', name: 'erreur.txt', description: "L'erreur obtenue" }] })
    }
  }
}