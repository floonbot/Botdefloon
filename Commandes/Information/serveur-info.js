const Discord = require("discord.js");
const { infoE } = require("../.././json/emoji.json");

module.exports = {

    name: "serveur-info",
    description: "Permet de voir les Information du serveur",
    dm: false,
    category: "👆🏻Information",

    async run(bot, message) {

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite moi")
                    .setStyle(Discord.ButtonStyle.Link)
                    //Mettre le lien de ton bot
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1041282190060826635&permissions=8&scope=bot")
            )

        const serveurEmbed = new Discord.EmbedBuilder()
            .setTitle(`***LES INFORMATIONS DU SERVEUR ${message.guild.name}***`)
            .setColor("#0070FF")
            .setDescription(`
               ${infoE} **__Serveur Informations__**
 
                > Name : \`${message.guild.name}\`
                > ID : \`${message.guild.id}\`
                > Description : \`${message.guild.description}\`
                > Créateur : <@${message.guild.ownerId}>
                > Boost : ${message.guild.premiumSubscriptionCount}
                > Créer le : ${message.guild.createdAt}
                > Vérification : \`${message.guild.verificationLevel}\`
                > Ping : \`${bot.ws.ping}\`
             
                ${infoE} **__Information Compte__**
 
                > Membre Totaux : \`${message.guild.memberCount}\`
                > Bot(s): \`${message.guild.members.cache.filter(b => b.user.bot).size}\`
                > Utilisateur(s) : \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`
 
                ${infoE}  ** __Statistique Information__ **
 
                > Catégorie : \`${message.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildCategory).size}\`
                > Vocal : \`${message.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice).size}\`
                > Textuel : \`${message.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size}\`
                > Forum : \`${message.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildForum).size}\`
                > Roles : \`${message.guild.roles.cache.size}\`
                > Emojis :\`${message.guild.emojis.cache.size}\`
                    `)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .setFooter({ text: `${message.user.tag}`, iconURL: `${message.user.avatarURL()}` })
        message.reply({ embeds: [serveurEmbed], components: [row] })
    }
}