const Discord = require("discord.js");

module.exports = {

    name: "unlock",
    description: "Permet de unlock un salon",
    permsission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Quel est le salon ?",
            required: true,
            autocomplete: false
        }, {
            type: "role",
            name: "role",
            description: "Quel est le rôle ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if (!message.guild.channels.cache.get(channel.id)) return message.reply({ content: "Pas de salon !!", ephemeral: true })
        if (channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Enovyer un salon textuel.")

        let role = args.getRole("role")
        if (role && !message.guild.roles.cache.get(role.id)) return message.reply({ content: "Pas de role !!", ephemeral: true })
        if (!role) role = message.guild.roles.everyone;

        if (channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes("SendMessages")) return message.reply({ content: `Le rôle \`${role.name}\` est déjà unlock dans le salon ${channel} !!`, ephemeral: true })

        if (channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, { SendMessages: true })
        else await channel.permissionOverwrites.create(role.id, { SendMessages: true })

        await message.reply({ content: `Le rôle \`${role.name})\` a bien été unlock dans le salon ${channel}`, ephemeral: true })
    }
}