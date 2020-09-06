const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Éh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));

    let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");
    if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

    if(!message.guild.member(message.author).roles.cache.has(grade.id)){return bot.functions.error(message.channel, `Seuls les membres de l'équipe peuvent utiliser la commande.`)}

    let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[0]);
    if(!user) return bot.functions.error(message.channel, `Veuillez indiquer une utilisateur à retirer du ticket.`)

    message.channel.permissionOverwrites.get(user.id).delete().catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});
    bot.functions.success(message.channel, `${user} a bien été retiré de ce ticket.`);
}

exports.help = {
    name: "remove",
    aliases: []
}

exports.requirements = {
    botOwner: false,
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}
