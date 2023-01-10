const osu = require('node-os-utils');
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os
const si = require('systeminformation');
const Discord = require("discord.js");

module.exports = {

    name: "machine-info",
    description: "Permet de voir la machine",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        await message.deferReply()

        const cpuUsage = `> Model : \`${await cpu.model()}\`\n> Utilisé: \`${await cpu.usage() + " %"}\`\n> Restant : \`${await cpu.free() + " %"}\`\n> Logique : \`${await cpu.count()}\`\n> Cœur : \`${(await si.cpu()).physicalCores}\`\n> Fréquence : \`${(await si.cpu()).speed}\`\n> Avg :\`${await cpu.loadavg()}\`\n> Avg :\`${await cpu.loadavgTime()}\``;
        const memoryUsage = `> Total : \`${(await mem.info()).totalMemMb + "MB"}\`\n> Utilisé : \`${(await mem.info()).usedMemMb + "MB"}\`\n> Restante : \`${await (await mem.info()).freeMemMb + "MB"}\``
        const operatingSystem = `> Name : \`${os.hostname()}\`\n> Plateforme : \`${os.platform()}\`\n> Type : \`${os.type()}\`\n> Version : \`${os.arch()}\`\n> upTime : \`${os.uptime()}\`\n> Version system \`${si.version()}\` `
        const bios = `> Model : \`${(await si.baseboard()).model}\`\n> Nombre de slot de ram : \`${(await si.baseboard()).memSlots}\`\n> Version du bios : \`${(await si.bios()).version}\`\n> Dernière mis à jour : \`${(await si.bios()).releaseDate}\``
        const reseau = `> Vitesse de connection : \`${(await si.networkInterfaces())[0].speed + " MO"}\`\n> Ms : \`${(await si.networkStats())[0].ms + " ms"}\``
        const Disque = `> Type : \`${(await si.diskLayout())[0].type}\`\n> Nom : \`${(await si.diskLayout())[0].name}\``

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi")
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
            )

        const embed = new Discord.EmbedBuilder()

            .setTitle("***LES INFORMATIONS SUR LA MACHINE***")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(` **__Information de la machine__** 

                     **__Cpu :__**\n ${cpuUsage}\n
                     **__Ram :__**\n ${memoryUsage}\n
                    **__System :__**\n ${operatingSystem}\n
                   **__Carte mère :__**\n ${bios}\n
                **__Réseau__**\n ${reseau}\n 
                    **__Disque__**\n ${Disque}\n
                  
                    `)
            .setColor("#0070FF")
            .setTimestamp()
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        await message.followUP({ embeds: [embed], components: [row] })
    }
}