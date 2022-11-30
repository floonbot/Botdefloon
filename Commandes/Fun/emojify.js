
module.exports = {

  name: 'emojify',
  description: "Permet de mettre le text en emoji",
  permission: "Aucune",
  dm: false,
  category: "🥳Fun",
  options: [
    {
      type: "string",
      name: "text",
      description: "Quel est le text ?",
      required: true,
      autocomplete: false
    },
  ],

  async run(bot, message, args) {

    await message.deferReply()

    if (!args.getString("text")) return message.reply({ content: "Merci de mettre un text valide !!", ephemeral: true })
    const specialCodes = {
      '0': ':zero:',
      '1': ':one:',
      '2': ':two:',
      '3': ':three:',
      '4': ':four:',
      '5': ':five:',
      '6': ':six:',
      '7': ':seven:',
      '8': ':eight:',
      '9': ':nine:',
      '#': ':hash:',
      '*': ':asterisk:',
      '?': ':grey_question:',
      '!': ':grey_exclamation:',
      ' ': '   '
    }

    let text = args.getString("text").toLowerCase().split('').map(letter => {
      if (/[a-z]/g.test(letter)) {
        return `:regional_indicator_${letter}:`
      } else if (specialCodes[letter]) {
        return `${specialCodes[letter]}`
      }
      return letter;
    }).join('');

    message.followUp(text)
  }
}