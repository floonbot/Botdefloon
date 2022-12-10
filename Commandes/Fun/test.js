var colors = require('colors');

module.exports = {

  name: "test",
  description: "Pose une question et il te dira la vérité",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
 
  async run(bot, message, args) {
 
   console.log(colors.red.italic.bgBrightMagenta("oui"))
  } 
}