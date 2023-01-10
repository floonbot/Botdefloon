const { dé } = require("../.././json/emoji.json");

module.exports = {

    name: "delete-perso",
    description: "Permet de crée son perso",
    permission: "Aucune",
    dm: false,
    category: `${dé}Jeux de rôle`,

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guildId}' AND userId = '${message.user.id}'`, async (err, req) => {

            db.query(`UPDATE mmorpg SET name = 'false' WHERE userId = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET race = 'false' WHERE userId  = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET classe = 'false' WHERE userId  = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET description = 'false' WHERE userId  = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET mana = '0' WHERE userId  = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET forces = '0' WHERE userId  = '${message.user.id}'`)
            db.query(`UPDATE mmorpg SET défense = '0' WHERE userId  = '${message.user.id}'`)

            message.reply("J'ai bien supprimé le perso")
        })
    }
}