const Discord = require("discord.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Eh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));

    let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");
    if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

    if(!message.guild.member(message.author).roles.cache.has(grade.id)){return bot.functions.error(message.channel, `Seuls les membres de l'équipe peuvent utiliser la commande.`)}
    if(bot.db.get(`ticket.open.${message.channel.id}.suspendu`) === "Oui") return bot.functions.error(message.channel, "Désolé, ce ticket est déjà suspendu.");

    let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];

    let catSuspend = message.guild.channels.cache.find(c => c.name == "suspends" && c.type == "category");
    if(!catSuspend) catSuspend = await message.guild.channels.create("suspends", {type: "category", position: 1, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id } ]}).catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});

    if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
    suspendPad = `${bot.db.get(`subject.all`)}`;
    await sleep(1000);
    message.channel.edit({ name: `suspend-${suspendPad.padStart(4, '0')}`, parentID: catSuspend.id, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: bot.db.get(`ticket.open.${message.channel.id}.user`) } ]});
    await sleep(2000);
    bot.functions.success(message.channel, `Ce ticket a été suspendu.`);

    bot.db.set(`ticket.open.${message.channel.id}.suspendu`, "Oui");

}

exports.help = {
    name: "suspend",
    aliases: ['sus']
}

exports.requirements = {
    botOwner: false,
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}
