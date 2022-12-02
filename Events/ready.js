const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

  bot.db = await loadDatabase()
  bot.db.connect(function (err) {
    if (err) throw err;

    console.log("Connected to database")

  })

  await loadSlashCommands(bot)

  console.log(`${bot.user.tag} est en ligne`)
}