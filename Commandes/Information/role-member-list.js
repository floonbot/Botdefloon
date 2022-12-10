const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { roleE } = require("../.././json/emoji.json");

module.exports = {

  name: "role-member-list",
  description: "Permet de voir les membres avec le rôle",
  permission: "Aucune",
  dm: false,
  category: "👆🏻Information",
  options: [
    {
      type: 'role',
      name: "role",
      description: "Quel est le rôle ?",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message) {

      await message.deferReply()

      const roled = message.options.getRole("role");

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Invite moi")
            .setStyle(ButtonStyle.Link)
            //Mettre le lien de ton bot
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
        )

      let Embed = new EmbedBuilder()
        .setColor("#FF5D00")
        .setTitle(`Chargement de la commande role-member-list !!`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`${roleE} **__Je cherche les rôle du serveur ${message.guild.name}__** ${roleE}

                > **Sur le serveur :** ${message.guild.name}, 
                
                \`veuillez patienter\`.`)
        .setTimestamp()
        .setFooter({ text: "role-member-list" })
      await message.followUp({ embeds: [Embed] }).then(() => {

        let roleEmbed = new EmbedBuilder()
          .setTitle("Liste des membres possédant le rôle")
          .setColor("#0070FF")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setDescription(`${roleE}**__Les pseudo des membre qui posséde le rôle__  :**

                ${roled.members.map(m => `>  ${roled} : \`${m.user.username}\``).join("\n") || "Aucun utilisateur"}`)
          .setFooter({ text: "role-member-list" })
          .setTimestamp()
        setTimeout(async () => await message.editReply({ embeds: [roleEmbed], components: [row]  }), 1000)
      })
  }
}