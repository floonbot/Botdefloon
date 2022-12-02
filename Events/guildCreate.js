
module.exports = async (bot, guild,) => {

  let db = bot.db;

  db.query(`SELECT * FROM server WHERE guildId = '${guild.id}'`, async (err, req) => {

    if (req.length < 1) {

      db.query(`INSERT INTO server (guildId, guild, captcha, logs, antiraid, welcome, goodbye, suggest, pub ) VALUES (${guild.id}, '${guild.name}',false','false','false','false','false','false','false')`)

    }
  })
}
