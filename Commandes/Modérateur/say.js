const Discord = require("discord.js");

module.exports = {
  name: "say",
  description: "Envoyer un message sous l'identiter du bot",
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