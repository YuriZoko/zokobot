const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {

    prefix = "!";

// ▆▆▆▆▆▆▆▆▆▆ HELP DESCRIPTION COMMAND ▆▆▆▆▆▆▆▆▆▆ //

  if(args[0] && bot.commands.has(args[0])){
    const cmd = bot.commands.get(args[0]);

    let userperms = cmd.requirements.userPerms;
    let botperms = cmd.requirements.userPerms;

    if(!userperms || userperms.length < 1) userperms = "Aucune permission requise."
    else userperms = userperms.join(", ");
    if(!botperms || botperms.length < 1) botperms = "Aucune permission requise."
    else botperms = botperms.join(", ");

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Aide | ${cmd.help.name} `, bot.user.displayAvatarURL())
    .addField(`Informations`, `Nom : \`${cmd.help.name}\``)
    .addField(`Permissions`, `Utilisateur : \`${userperms}\`\nBOT : \`${botperms}\``)
    .setColor(bot.color.black)
    .setTimestamp()
    .setFooter(`Demandée par : ${message.author.tag}`);
    return message.channel.send(embed)
  }

  // ▆▆▆▆▆▆▆▆▆▆ MAKE FOLDER & FILES DETECTIONS ▆▆▆▆▆▆▆▆▆▆ //

  fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
  fs.readdir(`./commands/Ticket/`, (err, files1) => {
  fs.readdir(`./commands/Utilitaires/`, (err, files2) => {

    let helpTICKET = `\`${files1.join(" | ").replace(/.js/gi, ``)}\``;
    let helpUTILS = `\`${files2.join(" | ").replace(/.js/gi, ``)}\``;

    // ▆▆▆▆▆▆▆▆▆▆ EMBED ▆▆▆▆▆▆▆▆▆▆ //

    let embedHelp = new Discord.MessageEmbed()
    .setAuthor(`📖 | Commands (${bot.commands.size})`, bot.user.displayAvatarURL())
    .setColor(bot.color.black)
    .setTimestamp()
    .setFooter(`Demandée par : ${message.author.tag}`)
    .addField("\\🎟️ Ticket", `\`${prefix}help tickets\``, true)
    .addField("\\🎒 Utilitaires", `\`${prefix}help utilitaires\``, true);

    let helpAll = new Discord.MessageEmbed()
    .setAuthor(`📖 | Commands (${bot.commands.size})`, bot.user.displayAvatarURL())
    .setColor(bot.color.black)
    .setThumbnail(bot.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Demandée par : ${message.author.tag}`)
    .addField("\\🎟️ Ticket", `${helpTICKET}`)
    .addField("\\🎒 Utilitaires", `${helpUTILS}`);

    let embedChoice = new Discord.MessageEmbed()
    .setColor(bot.color.black)
    .setTimestamp()
    .setFooter(`Demandée par : ${message.author.tag}`);

    // ▆▆▆▆▆▆▆▆▆▆ SENT EMBED CHOOSED ▆▆▆▆▆▆▆▆▆▆ //

      if(!args[0]) {
        message.channel.send(embedHelp)
      }else if(args[0] === "all"){
        message.channel.send(helpAll)

      } else if(args[0] === "utilitaires" || args[0] === "utils"){
        message.channel.send(embedChoice.setTitle(`🎒 Commandes Utilitaires`).setDescription(`${helpUTILS}`))
      } else if(args[0] === "tickets"){
        message.channel.send(embedChoice.setTitle(`🎟️ Commandes Ticket`).setDescription(`${helpTICKET}`))
      } else {
        message.channel.send(embedHelp)
      }

  })
  })
  });

}

exports.help = {
    name: "help",
    aliases: ['h', 'aide']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
