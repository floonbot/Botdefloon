const Discord = require("discord.js");

module.exports = {
    name: "say",
    description: "Permet d'envoyer un message avec le bot",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "🧑🏻‍⚖️Modération",
    options: [
        {
            type: "string",
            name: "message",
            description: "Quel est le message ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        const msg = args.getString("message");
        message.reply(msg);

    }
}