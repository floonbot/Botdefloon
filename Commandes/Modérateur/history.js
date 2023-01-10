const Discord = require("discord.js")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {

    name: "history",
    description: "Permet de connaitre les infractions d'un utilisateur",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel est le membre",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        try {

            let user;
            if (message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
                user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
                if (!user) return message.reply({ content: "Aucune personne trouvée !!", ephemeral: true })
            } else user = message.user ? message.user : message.author;

            db.query(`SELECT * FROM bans WHERE userID = ${user.id}`, async (err, bans) => {
                db.query(`SELECT * FROM kicks WHERE userID = ${user.id}`, async (err, kicks) => {
                    db.query(`SELECT * FROM mutes WHERE userID = ${user.id}`, async (err, mutes) => {
                        db.query(`SELECT * FROM warns WHERE userID = ${user.id}`, async (err, warns) => {

                            if (bans.length <= 0 && kicks.length <= 0 && mutes.length <= 0 && warns.length <= 0) return message.reply(`\`${user.tag}\` n'a aucune sanction !`)

                            let Embed = new EmbedBuilder()
                                .setColor("#FF0000")
                                .setTitle(`***INFRACTION DE ${user.tag}***`)
                                .setDescription(`Bannissement(s) : \`${bans.length}\`\nExplusions : \`${kicks.length}\`\n Muets : \`${mutes.length}\`\n Avertissements : \`${warns.length}\` `)
                                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                                .setTimestamp()
                                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                            const btn = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('ban')
                                        .setLabel("Bannissements")
                                        .setDisabled(bans.length >= 1 ? false : true)
                                        .setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder()
                                        .setCustomId("kick")
                                        .setLabel("Expulsions")
                                        .setDisabled(kicks.length >= 1 ? false : true)
                                        .setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder()
                                        .setCustomId("mute")
                                        .setLabel("Muet")
                                        .setDisabled(mutes.length >= 1 ? false : true)
                                        .setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder()
                                        .setCustomId("warn")
                                        .setLabel("Avertissements")
                                        .setDisabled(warns.length >= 1 ? false : true)
                                        .setStyle(ButtonStyle.Primary),
                                    new ButtonBuilder()
                                        .setCustomId("cancel")
                                        .setLabel("Annuler")
                                        .setStyle(ButtonStyle.Danger))

                            let msg = await message.reply({ embeds: [Embed], components: [btn] })
                            let filter = async () => true;

                            const collector = (message.user ? (await message.fetchReply()) : msg).createMessageComponentCollector({ filter, time: 120000 })

                            collector.on("collect", async button => {

                                if (button.user.id !== (message.user ? message.user.id : message.author.id)) return bouton.reply({ content: "Vous n'êtes pas l'auteur du message", ephemeral: true })

                                if (button.customId === "cancel") return await collector.stop()

                                if (button.customId === "ban") {

                                    await button.deferUpdate()
                                    let description = "";

                                    let newEmbed = new EmbedBuilder()
                                        .setColor("#FF0000")
                                        .setTitle(`***BANISSEMENT DE ${user.tag}***`)
                                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                                        .setTimestamp()
                                        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                                    for (let i = 0; i < bans.length; i++) {
                                        description += `**__Banissement n°${i + 1}__**\n\n> **Auteur** : ${bot.users.cache.get(bans[i].authorId)}\n> **Duurée** : ${bans[i].time}\n> **Raison** : ${bans[i].reason}\n> **Date** : <t:${Math.floor(parseInt(bans[i].date) / 1000)}:F>\n\n`;
                                    }

                                    newEmbed.setDescription(description)

                                    if (message.user) await message.editReply({ embeds: [newEmbed] })
                                    else await msg.edit({ embeds: [newEmbed] })
                                }

                                if (button.customId === "kick") {

                                    await button.deferUpdate()
                                    let description = "";

                                    let newEmbed = new EmbedBuilder()
                                        .setColor("#FF0000")
                                        .setTitle(`EXPULSION DE  ${user.tag}`)
                                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                                        .setTimestamp()
                                        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                                    for (let i = 0; i < kicks.length; i++) {
                                        description += `**__Expulsion n°${i + 1}__**\n\n> **Auteur** : ${bot.users.cache.get(kicks[i].authorId)}\n> **Raison** : ${kicks[i].reason}\n> **Date** : <t:${Math.floor(parseInt(kicks[i].date) / 1000)}:F>\n\n`;
                                    }

                                    newEmbed.setDescription(description)

                                    if (message.user) await message.editReply({ embeds: [newEmbed] })
                                    else await msg.edit({ embeds: [newEmbed] })
                                }

                                if (button.customId === "mute") {

                                    await button.deferUpdate()
                                    let description = "";

                                    let newEmbed = new EmbedBuilder()
                                        .setColor("#FF0000")
                                        .setTitle(`***MUTE DE ${user.tag}***`)
                                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                                        .setTimestamp()
                                        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                                    for (let i = 0; i < mutes.length; i++) {
                                        description += `**__Muet n°${i + 1}__**\n\n> **Auteur** : ${bot.users.cache.get(mutes[i].authorId)}\n> **Duurée** : ${mutes[i].time}\n> **Raison** : ${mutes[i].reason}\n **Date** : <t:${Math.floor(parseInt(mutes[i].date) / 1000)}:F>\n\n`;
                                    }

                                    newEmbed.setDescription(description)

                                    if (message.user) await message.editReply({ embeds: [newEmbed] })
                                    else await msg.edit({ embeds: [newEmbed] })
                                }

                                if (button.customId === "warn") {

                                    await button.deferUpdate()
                                    let description = "";

                                    let newEmbed = new EmbedBuilder()
                                        .setColor("#FF0000")
                                        .setTitle(`***AVERTISSEMENT DE ${user.tag}***`)
                                        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
                                        .setTimestamp()
                                        .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })

                                    for (let i = 0; i < warns.length; i++) {
                                        description += `**Avertissement n°${i + 1}__**\n\n> **Auteur** : ${bot.users.cache.get(warns[i].authorId)}\n> **Id** : \`${warns[i].warn}\`\n> **Raison** : ${warns[i].reason}\n> **Date** : <t:${Math.floor(parseInt(warns[i].date) / 1000)}:F>\n\n`;
                                    }

                                    newEmbed.setDescription(description)

                                    if (message.user) await message.editReply({ embeds: [newEmbed] })
                                    else await msg.edit({ embeds: [newEmbed] })
                                }
                            })

                            collector.on("end", async () => {

                                if (message.user) return await message.editReply({ components: [], embeds: [(await message.fetchReply()).embeds[0]] })
                                else return await msg.edit({ components: [], embeds: [msg.embeds[0]] })
                            })
                        })
                    })
                })
            })

        } catch (err) {

            return message.reply({ content: "Aucune personne trouvée !!", ephemeral: true })
        }
    }
}