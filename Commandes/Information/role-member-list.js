const Discord = require("discord.js");
const { roleE } = require("../.././json/emoji.json");

module.exports = {

    name: "role-member-list",
    description: "Permet de voir les membres avec le rôle",
    permission: "Aucune",
    dm: false,
    category: "👆🏻Information",
    options: [
        {
            type: 'role',
            name: "role",
            description: "Quel est le rôle ?",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message) {

        const roled = message.options.getRole("role");

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi")
                    .setStyle(Discord.ButtonStyle.Link)
                    //Mettre le lien de ton bot
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
            )

        let roleEmbed = new Discord.EmbedBuilder()
            .setTitle("***LiSTE DES RÔLES***")
            .setColor("#0070FF")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setDescription(`${roleE}**__Les pseudo des membre qui posséde le rôle__  :**

                ${roled.members.map(m => `>  ${roled} : \`${m.user.username}\``).join("\n") || "Aucun utilisateur"}`)
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
            .setTimestamp()
        await message.reply({ embeds: [roleEmbed], components: [row] })
    }
}