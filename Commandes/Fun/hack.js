const ms = module.require("ms");

module.exports = {

    name: "hack",
    description: "Permet de hack quelqu'un",
    permission: "Aucune",
    dm: false,
    category: "🥳Fun",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur a hack",
            required: true,
        }
    ],

    async run(message, args) {

        let caracteres = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
        let ID = [];
        let user = args.getUser("utilisateur")

        const amount = Math.floor(Math.random() * 1000000000000000) + 1;
        for (let i = 0; i < 10; i++) ID.push(caracteres[Math.floor(Math.random() * caracteres.length)])

        let msg = await message.reply(`**Hack sur <@${user.id}> en cours ....**`);

        let time = "1s";
        setTimeout(function () {
            message.editReply(`**Découverte du mail et mot de passe de** <@${user.id}> .....`);
        }, ms(time));

        let time1 = "6s";
        setTimeout(function () {
            message.editReply(`**Mail : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time1));

        let time2 = "9s";
        setTimeout(function () {
            message.editReply("**Trouver d'autres comptes .....**");
        }, ms(time2));

        let time3 = "15s";
        setTimeout(function () {
            message.editReply("**Configuration du compte Epic Games .....**");
        }, ms(time3));

        let time4 = "21s";
        setTimeout(function () {
            message.editReply("**Hack Compte Epic Games......**");
        }, ms(time4));

        let time5 = "28s";
        setTimeout(function () {
            message.editReply("**Compte Epic Games piraté !!**");
        }, ms(time5));

        let time6 = "31s";
        setTimeout(function () {
            message.editReply("**Collecte d'infos.....**");
        }, ms(time6));

        let time7 = "38s";
        setTimeout(function () {
            message.editReply("**Stransmettre des données au Gouvernement...**");
        }, ms(time7));

        let time8 = "41s";
        setTimeout(function () {
            message.editReply(`**Piratage terminé \n Mail : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time8));
    }
}