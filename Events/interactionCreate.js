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


}








