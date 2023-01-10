const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({ intents })
const config = require("./config")
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const Player = require("discord-player")
require(`./Fonctions/anti-crash.js`)();

bot.commands = new Discord.Collection()
bot.player = new Player.Player(bot, {
  leaveOnEnd: true,
  leaveOnEmpty: true,
  initialVolume: 100,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }

})

bot.fonction = {
  createId: require("./Fonctions/createId"),
  generateCaptcha: require("./Fonctions/generateCaptcha"),
  searchSpam: require("./Fonctions/searchSpam")
}


bot.login(config.TOKEN)
loadCommands(bot)
loadEvents(bot)