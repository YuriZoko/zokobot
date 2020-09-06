const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let email = args.join(" ");
    if(!email || !email.includes(`@`)) return bot.functions.error(message.channel, "S'il vous plaît, veuillez indiquer une e-mail valide.");

    bot.db.set(`email.${message.author.id}`, email);

    if(bot.db.has(`ticket.open.${message.author.id}`) && bot.db.get(`ticket.open.${message.author.id}.channel`) === message.channel.id){
        message.channel.send(`:white_check_mark: Votre compte est maintenant sauvegardé avec : \`${email}\`. Veuillez vous assurer de nous donner le **maximum de détails** afin que nous puissions répondre le plus précisément possible à votre demande. **Quel est l'objet de votre demande ?**`)
        message.channel.edit({ topic: `${message.channel.topic} (${email})` });
    } else {
        message.channel.send(`:white_check_mark: Votre compte est maintenant sauvegardé avec : \`${email}\`.`);
    }

}

exports.help = {
    name: "setemail",
    aliases: ['se']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
