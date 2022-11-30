const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js");
const { pingE, TimeE, infoE, Emojibot } = require("../json/emoji.json");


module.exports = async (bot, interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let entry = interaction.options.getFocused()

    if (interaction.commandName === "help") {

      let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
      await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })))
    }

    if (interaction.commandName === "eval") {

      let choices = ["+", "-", "*", "/", "%"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "setcommandes") {

      let choices;

      const focusedOption = interaction.options.getFocused(true);

      if (focusedOption.name === 'commande') {
        choices = ['logs', 'antiraid', 'captcha', 'suggest', 'welcome', 'goodbye']
      }

      if (focusedOption.name === 'état') {
        choices = ['on', 'off']
      }

      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "traduction") {

      let choices;

      const focusedOption = interaction.options.getFocused(true);

      if (focusedOption.name === 'langue') {
        choices = ['fr', 'en', 'ja']
      }

      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "setyoutube") {

      let choices = ["off", "on"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "setstatus") {

      let choices = ["Listening", "Playing", "Competing", "Watching", "Streaming"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "gif") {

      let choices = ["kill", "kiss", "badass", "punch"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "nsfw") {

      let choices = ["pussy", "aHarem", "boobs", "lesbienne"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }

    if (interaction.commandName === "pfc") {

      let choices = ["pierre", "feuille", "ciseaux"]
      let sortie = choices.filter(c => c.includes(entry))
      await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
    }
  }

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = interaction.client.commands.get(interaction.commandName);
    command?.run?.(bot, interaction, interaction.options, bot.db)
  }

  if (interaction.isButton()) {

    if (interaction.customId.startsWith("reglement")) {

      const role = interaction.guild.roles.cache.get(interaction.customId.split("reglement")[1])
      interaction.member.roles.add(role.id).then(() => {
        interaction.reply({ content: `<@&${role.id}> a étais ajouter `, ephemeral: true })
      })
    }

    if (interaction.customId.startsWith("Ping")) {

      const ping = Date.now() - interaction.createdAt;
      const api_ping = bot.ws.ping;
      const uptime = moment.duration(interaction.client.uptime).format(" D[d], H[h], m[m], s[s]")

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Actualiser")
            .setStyle(ButtonStyle.Success)
            .setCustomId("Ping")
        )

      pingEmbed = new Discord.EmbedBuilder()
        .setColor("#0070FF")
        .setTitle(`La lantence du bot`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(`
                    
                    > ${pingE} **Bot :** \`${ping}\` ms 
                    > ${pingE} **API :** \`${api_ping}\` ms
                    > ${TimeE}**Temps Uptime :** ${uptime}`)
        .setTimestamp()
        .setFooter({ text: "Ping" })
      interaction.update({ embeds: [pingEmbed], components: [row] })
    }
  }

  if (interaction.isButton()) {

    if (interaction.customId === "close") {

      let EmbedPermissionClose = new EmbedBuilder()
        .setColor("#3dffcc")
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionClose], ephemeral: true })

      let EmbedCloseTicket = new EmbedBuilder()
        .setColor("#3dffcc")
        .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)
      let Button = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setCustomId('oui')
          .setLabel("Oui")
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('non')
            .setLabel("Non")
            .setStyle(ButtonStyle.Danger),
        );
      await interaction.reply({ embeds: [EmbedCloseTicket], components: [Button] });
    }
    else if (interaction.customId === "oui") {
      let EmbedPermissionClose = new EmbedBuilder()
        .setColor("#3dffcc")
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionClose], ephemeral: true })

      interaction.channel.delete();
    }
    else if (interaction.customId === "non") {
      let EmbedPermissionClose = new EmbedBuilder()
        .setColor("#3dffcc")
        .setDescription(`❌ Vous n'avez pas la permission requise !`)

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ embeds: [EmbedPermissionClose], ephemeral: true })

      interaction.message.delete()
    }
  }

  if (interaction.isSelectMenu()) {

    if (interaction.customId === 'help') {

      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.SelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('✅ |CHOIX  !!')
            .addOptions(
              {

                label: "Select pour toute l'accueil",
                description: 'accueil',
                emoji: `${Emojibot}`,
                value: 'choix7',
              },
              {

                label: 'Select pour toute les commandes',
                description: 'Toute les commandes',
                emoji: "🤖",
                value: 'choix1',
              },
              {

                label: "Select pour les commandes d'information",
                description: 'Commande information',
                emoji: `${infoE}`,
                value: 'choix3',
              },
              {

                label: 'Select pour les commandes xp',
                description: 'Commande xp',
                emoji: `💹`,
                value: 'choix2',
              },
              {

                label: 'Select pour les setcommandes',
                description: 'Set des commandes',
                emoji: `🗃️`,
                value: 'choix6',
              },
              {

                label: "Select pour les commandes fun",
                description: 'Commande fun ',
                emoji: `🥳`,
                value: 'choix4',
              },
              {

                label: "Select pour les commandes modérateur",
                description: 'Commande modérateur',
                emoji: `🧑🏻‍⚖️`,
                value: 'choix5',
              }
            )
        )
      if (interaction.values == 'choix1') {

        let command;

        if (!command) {

          let categories = [];
          bot.commands.forEach(command => {
            if (!categories.includes(command.category)) categories.push(command.category)
          })

          let Embed = new Discord.EmbedBuilder()
            .setColor("#0070FF")
            .setTitle(`Info des commandes`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: "Commandes du bot" })

          await categories.sort().forEach(async cat => {

            let commands = bot.commands.filter(cmd => cmd.category === cat)
            Embed.addFields({ name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}` })
          })
          await interaction.update({ embeds: [Embed], components: [row] })

        }
      }

      if (interaction.values == 'choix2') {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`Info des commandes`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Commande pour les commandes xp__**
  
                  \`rank\` : Donne l'xp d'un membre
                  \`leaderboard\` : Envoie le top 10 des membres avec le plus d'xp`)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed], components: [row] })
      }

      if (interaction.values == 'choix3') {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`Info des commandes`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Commande pour les commandes information__**
  
                  \`admin-list\` : Permet de regarder le nombre d'admin
                  \`booster-list\` : Permet de voir la liste des boosts sur le serveur
                  \`bot-info\` : Les informations sur le bot
                  \`bot-list\` : Permet de regarder le nombre de bot
                  \`help\` : Donne les commands du bot
                  \`ip\` : Permet d'avoir l'ip du serveur
                  \`machine-info\` : Donne des information sur la machine
                  \`ping\` : Donne le ping du bot
                  \`role-member-list\` : Permet de voir les membres avec le rôle
                  \`serveur-info\` : Permet de voir les Information du serveur
                  \`serveur-list\` : Permet de voit le top5 des serveurs du bot
                  \`suggest\` : Permet d'envoyer une suggestion
                  \`url\` : Permet de voir l'url personnaliser du serveur
                  \`user-info\` : Permet de voir les informations d'un membre`)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed], components: [row] })
      }

      if (interaction.values == 'choix4') {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`Info des commandes`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Commande pour les commandes fun__**
  
                  \`8ball\` : Pose une question et il te dira la vérité
                  \`avatar\` : Permet de récupérer l'avatar d'un membre
                  \`dé\` : Permet de faire choisir le bot entre 1 et 6
                  \`eval\` : Permet de calcule
                  \`gif\` : Permet de effectuer un gif
                  \`nsfw\` : envoye une image nsfw
                  \`pfc\` : Joue à pfc
                  \`random\` : Le bot prend au hasard un nombre entre 1 et 100`)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed], components: [row] })
      }

      if (interaction.values == 'choix5') {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`Info des commandes`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Commande pour les commandes modérateur__**
  
                  \`add-lemoji\` : Permet d'ajouter un émoji sur le serveur
                  \`ban\` : Pour Ban le membre qui à fait l'infractions
                  \`black-list-add\` : Ajoute un joueur à la blacklist
                  \`black-list-remove\` : Supprime un joueur de la blacklist
                  \`black-list\` : Affiche les membres blacklist
                  \`clear\` : Efface beaucoup de messages
                  \`dm\` : DM un membre
                  \`embed-builder\` : Envoyer un embed personnalisé
                  \`history\` : Permet de connaitre les infractions d'un utilisateur
                  \`kick\` : Pour kick un membre qui à fait une infractions
                  \`lock\` : Permet de lock un salon
                  \`mute\` : Permet de mute un membre sur le serveur
                  \`nuke\` : Recréer un salon
                  \`règlement\` : Choisir le salon pour mettre un règlement
                  \`say\` : Envoyer un message sous l'identiter du bot
                  \`ticket\` : envoi l'embed des ticket
                  \`unban\` : unBan un membre
                  \`unlock\` : Permet de unlock un salon
                  \`unmute\` : Permet d'enlever le mute d'un membre
                  \`unwarn\` : Permet de supprimer un warn d'un membre
                  \`warn\` : Pour warn un membre sur le serveur
                  \`warnlist\` : Affiche les warns d'un membre`)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed], components: [row] })
      }

      if (interaction.values == 'choix6') {

        let Embed = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setTitle(`Info des commandes`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Commande pour les setcommandes__**
  
                  \`setcommandes\` : Paramètre les commandes sur le serveur
                  \`setstatus\` : Paramètre les commandes sur le serveur`)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed], components: [row] })
      }

      if (interaction.values == 'choix7') {

        let categories = [];
        bot.commands.forEach(command => {
          if (!categories.includes(command.category)) categories.push(command.category)
        })

        let Embed1 = new Discord.EmbedBuilder()
          .setColor("#0070FF")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${infoE} **__Bienvenue sur la commande help__**
  
                    > Commands disponibles : \`${bot.commands.size}\`
                    > Catégories disponibles : \`${categories.length}\``)
          .setTimestamp()
          .setFooter({ text: "Commandes du bot" })

        await interaction.update({ embeds: [Embed1], components: [row] })
      }
    }
  }

  if (interaction.isSelectMenu()) {

    if (interaction.customId === 'menuticket') {

      if (interaction.values == 'Questions', 'Plainte', 'Bug') {

        const EmbedTicket1 = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`Créer un ticket :   `)
          .setDescription(`Pour **Ouvrir** un **Ticket** Séléctionnez la **catégorie** qui vous convient`)
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "Ticket" });

        const RowTicket = new ActionRowBuilder()
          .addComponents(

            new SelectMenuBuilder()
              .setCustomId('menuticket')
              .setPlaceholder('Sélectionner le type de ticket que vous voulez !!')
              .addOptions(
                {
                  label: `Questions`,
                  description: `Poser une question de tout type`,
                  emoji: `❓`,
                  value: `Questions`,
                },
                {
                  label: `Plainte`,
                  description: `Faire une plainte envers un staff ou un membre du Discord`,
                  emoji: `🖋`,
                  value: `Plainte`,
                },
                {
                  label: `Bug`,
                  description: `Signaler un bug`,
                  emoji: `⚠`,
                  value: `Bug`,
                }
              )
          )
        await interaction.deferUpdate();
        await interaction.editReply({ embeds: [EmbedTicket1], components: [RowTicket] })

        let channel = await interaction.guild.channels.create({
          name: `${interaction.values}-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.user,
              allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
            }
          ]
        })

        let EmbedCreateChannel = new EmbedBuilder()
          .setColor("#3dffcc")
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !")
          .setTimestamp()
          .setFooter({ text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });
        const Row = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()
            .setCustomId('close')
            .setLabel('Fermer le ticket')
            .setEmoji('🗑️')
            .setStyle(ButtonStyle.Danger),
          )

        await channel.send({ embeds: [EmbedCreateChannel], components: [Row] })
      }
    }
  }
}







