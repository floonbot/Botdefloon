const Discord = require("discord.js");
const { dé } = require("../.././json/emoji.json");

module.exports = {

    name: "create-perso",
    description: "Permet de crée son perso",
    permission: "Aucune",
    dm: false,
    category: `${dé}Jeux de rôle`,
    options: [
        {
            type: "string",
            name: "name",
            description: "Quel est le nom ?",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "race",
            description: "Quel est la race ?",
            required: true,
            autocomplete: true
        },
        {
            type: "string",
            name: "classe",
            description: "Quel est la classe ?",
            required: true,
            autocomplete: true
        },
        {
            type: "string",
            name: "description",
            description: "Quel est la vie du perso ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let name = args.getString("name")
        let race = args.getString("race")
        let classe = args.getString("classe")
        let description = args.getString("description")
        if (!description) description = "Pas de description pour le personnage !!"

        db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guildId}' AND userId = '${message.user.id}'`, async (err, req) => {

            try {

                if (req[0].name !== "false") return message.reply({ content: "Vous avez déja un personnage !!", ephemeral: true })
                if (req[0].race !== "false") return message.reply({ content: "Vous avez déja un personnage !!", ephemeral: true })
                if (req[0].classe !== "false") return message.reply({ content: "Vous avez déja un personnage !!", ephemeral: true })
                if (req[0].description !== "false") return message.reply({ content: "Vous avez déja un personnage !!", ephemeral: true })

                if (classe !== "guerrier" && classe !== "tank" && classe !== "mage") {
                    let mauvais = new Discord.EmbedBuilder()
                        .setTitle(`**__LES CLASSES DISPONIBLE__**}`)
                        .setColor("#000000")
                        .setDescription("Les classe de classe dispo sont : \n\n \`guerrier\`\n \`mage\`\n \`tank\`")
                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                        .setTimestamp()
                        .setFooter({ text: "classe" })
                    return await message.reply({ embeds: [mauvais] })
                }

                else {

                    db.query(`UPDATE mmorpg SET name = '${name}' WHERE userId = '${message.user.id}'`)
                    db.query(`UPDATE mmorpg SET race = '${race}' WHERE userId  = '${message.user.id}'`)
                    db.query(`UPDATE mmorpg SET classe = '${classe}' WHERE userId  = '${message.user.id}'`)
                    db.query(`UPDATE mmorpg SET description = '${description}' WHERE userId = '${message.user.id}'`)

                    message.reply(`Le nom du personnage ${name}, la race ${race}, la classe de ${classe} et la description ont bien étais définie`)
                }

                if (race === "humain") {

                    let manaH = 3
                    let forceH = 5
                    let défenseh = 3

                    if (classe === "guerrier") {

                        let mana = -2
                        let force = 3
                        let défense = 1

                        let min = 1;
                        let max = 4;
                        let randommana = Math.floor(Math.random() * (max - min)) + min;
                        let randomforce = Math.floor(Math.random() * (max - min)) + min;
                        let randomdéfense = Math.floor(Math.random() * (max - min)) + min;

                        mana = mana + randommana + manaH
                        force = force + randomforce + forceH
                        défense = défense + randomdéfense + défenseh

                        db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guildId}' AND userId = '${message.user.id}'`, async (err, req) => {
                            db.query(`UPDATE mmorpg SET mana = '${mana}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET forces = '${force}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET défense = '${défense}' WHERE userId  = '${message.user.id}'`)
                        })
                    }
                    if (classe === "tank") {

                        let mana = -2
                        let force = -2
                        let défense = 6

                        let min = 1;
                        let max = 4;
                        let randomforce = Math.floor(Math.random() * (max - min)) + min;
                        let randomdéfense = Math.floor(Math.random() * (max - min)) + min;


                        force = force + randomforce + manaH
                        défense = défense + randomdéfense + défenseh
                        mana = mana + manaH

                        db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guildId}' AND userId = '${message.user.id}'`, async (err, req) => {
                            db.query(`UPDATE mmorpg SET mana = '${mana}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET forces = '${force}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET défense = '${défense}' WHERE userId  = '${message.user.id}'`)
                        })
                    }
                    if (classe === "mage") {

                        let mana = 6
                        let force = -4
                        let défense = 1

                        let min = 1;
                        let max = 4;
                        let randomforce = Math.floor(Math.random() * (max - min)) + min;
                        let randommana = Math.floor(Math.random() * (max - min)) + min;


                        force = force + randomforce + manaH
                        défense = défense + défenseh
                        mana = mana + manaH + randommana

                        db.query(`SELECT * FROM mmorpg WHERE guildId = '${message.guildId}' AND userId = '${message.user.id}'`, async (err, req) => {
                            db.query(`UPDATE mmorpg SET mana = '${mana}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET forces = '${force}' WHERE userId  = '${message.user.id}'`)
                            db.query(`UPDATE mmorpg SET défense = '${défense}' WHERE userId  = '${message.user.id}'`)
                        })
                    }
                }
            }
            catch (err) {

                message.reply({ content: "Le serveur n'est pas encore enregistrer , veuillez écrire un message ou la race et la classe n'est pas disponible  !!", ephemeral: true })

            }
        })
    }
}