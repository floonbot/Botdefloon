const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js")
const { request } = require('undici');

module.exports = {

    name: "profile-perso",
    description: "Permet de voir les stats de son perso",
    permission: "Aucune",
    dm: false,
    category: "Jeux de rôle",


    async run(bot, message, args, db) {

        try {

            db.query(`SELECT * FROM mmorpg WHERE userId = '${message.user.id}'`, async (err, req) => {

                if (req[0].name === "false") return message.reply("Tu n'as pas de perso crée, veuillez effectuer la commande create-perso")
                await message.deferReply()

                const canvas = Canvas.createCanvas(1280, 700);
                const ctx = canvas.getContext('2d');

                const background = await Canvas.loadImage('./assets/background/herbe.jpg');

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#0099ff'
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                if (req[0].classe === "tank") {

                    const { body } = await request("https://media.discordapp.net/attachments/1042718730678980628/1052259333951459398/3261675-0229918780-latest.png?width=451&height=676");
                    const avatar = await Canvas.loadImage(await body.arrayBuffer());

                    ctx.drawImage(avatar, 800, 10, 450, 690);
                }

                if (req[0].classe === "guerrier") {

                    const { body } = await request("https://media.discordapp.net/attachments/1042718730678980628/1052332845370195978/asta.png?width=676&height=676");
                    const avatar = await Canvas.loadImage(await body.arrayBuffer());

                    ctx.drawImage(avatar, 800, 10, 650, 700);
                }

                if (req[0].classe === "mage") {

                    const { body } = await request("https://media.discordapp.net/attachments/1042718730678980628/1052336708953309275/Shin_Walford.png?width=1202&height=676");
                    const avatar = await Canvas.loadImage(await body.arrayBuffer());

                    ctx.drawImage(avatar, 500, 150, 750, 550);
                }

                ctx.font = '60px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText('Status', 25 / 2.5, 200 / 3.5);


                ctx.font = '60px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText('Race', 800 / 2.5, 200 / 3.5);

                ctx.font = '60px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText('Classe', 1520 / 2.5, 200 / 3.5);

                ctx.font = '60px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText('Description', 25 / 2.5, 1000 / 3.5);

                ctx.font = '30px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText(`Force : ${req[0].forces}`, 40 / 2.5, 340 / 3.5);
                ctx.fillText(`Mana : ${req[0].mana}`, 40 / 2.5, 440 / 3.5);
                ctx.fillText(`Défense : ${req[0].défense}`, 40 / 2.5, 540 / 3.5);

                ctx.font = '30px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText(`Race : ${req[0].race}`, 815 / 2.5, 340 / 3.5);

                ctx.font = '30px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText(`Classe : ${req[0].classe}`, 1570 / 2.5, 340 / 3.5);


                ctx.font = '30px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.fillText(`Description : ${req[0].description}`, 40 / 2.5, 1150 / 3.5);

                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

                message.followUp({ files: [attachment] });

            })
        } catch (err) {
            message.reply("Tu n'as pas de perso crée, veuillez effectuer la commande create-perso")
        }
    }
}