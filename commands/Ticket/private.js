const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Eh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));

        let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");
        let gradeChef = message.guild.roles.cache.find(r => r.name === "Chef de projet");
        if(!gradeChef) message.guild.roles.create({data:{name: "Chef de projet", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
        if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

        if(!message.guild.member(message.author).roles.cache.has(grade.id)){return bot.functions.error(message.channel, `Seuls les membres de l'équipe peuvent utiliser la commande.`)}
        if(bot.db.get(`ticket.open.${message.channel.id}.private`) !== "Non") return bot.functions.error(message.channel, `Désolé mais ce ticket est déjà privé.`);

        message.channel.permissionOverwrites.get(grade.id).delete().catch(e => {});
        bot.functions.success(message.channel, `Vous êtes désormais dans un canal reservé aux chefs.`);

        bot.db.set(`ticket.open.${message.channel.id}.private`, gradeChef);

}

exports.help = {
    name: "private",
    aliases: ['pvt']
}

exports.requirements = {
    botOwner: false,
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}
