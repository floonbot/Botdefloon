const { readdirSync, lstatSync } = require("fs")

module.exports = async bot => {

  function scanDir(path) {

    for (const thing of readdirSync(path)) {

      if (lstatSync(path + thing).isDirectory()) scanDir(path + thing + '/')
      else {

        const command = require(path + thing)
        bot.commands.set(command.name, command)
      }
    }
  }
  scanDir(process.cwd() + '/Commandes/')
}