const Discord = require("discord.js");
const { pfc } = require("../.././json/emoji.json");

module.exports = {

    name: 'pfc',
    description: 'Joue à pfc',
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "string",
            name: "choix",
            description: "Permet de faire un PFC ?",
            required: true,
            autocomplete: true,
        },
    ],
    async run(bot, message, args) {

        let joueursH = args.getString("choix")
        let joueursB1 = ["pierre", "feuille", "ciseaux"]

        let punchradom = Math.floor(Math.random() * joueursB1.length);
        let joueursB = joueursB1[punchradom];

        await message.deferReply()

        if (joueursH === "pierre" && joueursB === "feuille") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :** ${pfc}
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "pierre" && joueursB === "pierre") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "pierre" && joueursB === "ciseaux") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            return await message.followUp({ embeds: [Embed] })
        }

        if (joueursH === "feuille" && joueursB === "pierre") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "feuille" && joueursB === "feuille") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                        > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                        > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "feuille" && joueursB === "ciseaux") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        }

        if (joueursH === "ciseaux" && joueursB === "pierre") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` perdu
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` gagner`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "ciseaux" && joueursB === "ciseaux") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` égalité
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` égalité`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        } else if (joueursH === "ciseaux" && joueursB === "feuille") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#00A705")
                .setDescription(`${pfc} **LES RÉSULTATS SONT :**
                    
                    > **Joueur ${message.user.tag} : ** a choisi \`${joueursH}\` gagner
                    > **Bot ${bot.user.tag} : ** a choisi \`${joueursB}\` perdu`)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            await message.followUp({ embeds: [Embed] })

        }

        if (joueursH !== "feuille" || joueursH !== "ciseaux" || joueursH !== "pierre") {

            let Embed = new Discord.EmbedBuilder()
                .setColor("#000000")
                .setTitle(`${pfc} **__Les choix du ppc__** ${pfc}`)
                .setDescription("Les choix de pfc dispo sont : \n\n \`pierre\`\n   \`feuille\`\n  \`ciseaux\`\n")
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64, }))
                .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            return await message.followUp({ embeds: [Embed] })
        }
    }
}