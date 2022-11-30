const figlet = require("figlet");

module.exports = {

  name: "texte-art",
  description: "Permet de faire un texte art",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "text",
      description: "Quel est le text ?",
      required: true,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    figlet.text(

      args.getString("text"),
      {

        font: "",

      },

      async (err, data) => {
        message.reply(`\`\`\`${data}\`\`\``)
      })
  }
}