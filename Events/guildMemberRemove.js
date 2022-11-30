const Discord = require("discord.js");
const fs = require("fs");
const Canvasez = require("discord-canvas-easy");

module.exports = async (bot, member) => {

  let db = bot.db;

  db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

    if (req.length < 1 || Boolean(req[0].goodbye) === false) return;

    let channel = bot.channels.cache.get(req[0].goodbye)
    if (!channel) return;

    const Goodbye = await new Canvasez.Home()
      .setBackground("./assets/background/goodbye.png")
      .setGuild(member.guild)
      .setUser(member.user)
      .setColorFont("#4B006E")
      .setText(`a quitté le serveur ${member.guild.name}`)
      .toHome()

    await channel.send({ files: [new Discord.AttachmentBuilder(Goodbye.toBuffer(), { name: "goodbye.png" })] })
  })
}
