const Discord = require("discord.js");
const axios = require('axios');

module.exports = {

  name: "add-emoji",
  description: "Permet d'ajouter un émoji sur le serveur",
  permission: Discord.PermissionFlagsBits.ManageChannels,
  dm: false,
  category: "🧑🏻‍⚖️Modération",
  options: [
    {
      type: "string",
      name: "emoji",
      description: "Quel est l'émojie ?",
      required: true,
      autocomplete: false
    }, {
      type: "string",
      name: "nom",
      description: "Quel est le nom ?",
      required: true,
      autocomplete: false
    }
  ],
  async run(bot, message) {

    try {

      let emoji = message.options.getString("emoji")?.trim();
      let name = message.options.getString("nom");

      if (emoji.startsWith("<") && emoji.endsWith(">")) {
        const id = emoji.match(/\d{15,}/g)[0];

        const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(image => {
          if (image) return "gif"
          else return "png"
        }).catch(err => {
          return "png"
        });

        emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
      }

      await message.guild.emojis.create({ attachment: emoji, name: name }).then(emoji => {
        message.reply({ content: `Nouveau émoji ajouter sur le serveur ${emoji.toString()} avec le nom ${emoji.name}`, ephemeral: true })

      })

    } catch (err) {

      message.reply({ content: `Je ne peux pas copie l'emoji`, ephemeral: true })

    }
  }
}

