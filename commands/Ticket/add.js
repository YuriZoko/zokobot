const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Eh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));

    let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");

    if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

    if(!message.guild.member(message.author).roles.cache.has(grade.id)){return bot.functions.error(message.channel, `Seuls les membres de l'équipe peuvent utiliser la commande.`)}

    if(!args[0]) return bot.functions.error(message.channel, "S'il vous plaît, veuillez indiquer un identifiant.");
    let user = message.guild.members.cache.find(m => m.id === args[0]);
    if(!user) return bot.functions.error(message.channel, "Désolé, cet utilisateur n'existe pas.");

    message.channel.updateOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true }).catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});
    bot.functions.success(message.channel, `${user} a bien été ajouté à ce ticket.`);
}

exports.help = {
    name: "add",
    aliases: []
}

exports.requirements = {
    botOwner: false,
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}
