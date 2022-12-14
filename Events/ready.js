const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const DBD = require("discord-dashboard")
const Theme = require("dbd-capriham-theme")
const config = require("../config")

module.exports = async bot => {

  bot.db = await loadDatabase()
  bot.db.connect(function (err) {
    if (err) throw err;

    console.log("Connected to database")

  })

  await loadSlashCommands(bot)

  console.log(`${bot.user.tag} est en ligne`)

  let allcommands = [];
  await bot.commands.forEach(command => allcommands.push({commandName: command.name, commandDescription: command.description}))

  await DBD.useLicense(config.license)
  DBD.Dashboard = DBD.UpdatedClass()

const Dashboard = new DBD.Dashboard({

    port: 8080,
    client: {
        id : bot.user.id,
        secret: config.secret,
    },
    redirectUri: "http://localhost:8080/discord/callback",
    domain: "http://localhost",
    minimalizedConsoleLogs: true,
    acceptPtivacyPolicy: false,
    bot : bot,

    theme: Theme({

        websiteName: "Dashboard de falling star",
        iconURL: 'https://cdn.discordapp.com/avatars/1041282190060826635/9a4ac63a18f10041d9847e127e5d32da.webp',
        index: {
            card:{
                title: "Le bot falling star",
                description: "Ajoute le sur ton serveur tu ne seras pas décus",
            },
            information: {
                title: "Information",
                description: "C'est un bot qui contient des commandes de modérations, un système d'xp et aussi plein de commande fun"
            },
            feeds: {
                title: "Feeds",
                list: [
                    {
                        icon: "fa fa-house",
                        text: "New user registered",
                        timeText: "Just now",
                        bg: "bg-light-info"
                    },
                    {
                        icon: "fa fa-server",
                        text: "Server issues",
                        timeText: "3 minutes ago",
                        bg: "bg-light-danger"
                    }
                ]
            }
        },
        commands: {
            pageTitle: "Commands",
            table: {
                title: "List",
                subTitle: "All Assistants' commands",
                list: allcommands
            }
        }
    }),

    settings: []

});

Dashboard.init();
}