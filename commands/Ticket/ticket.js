const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
    .setTitle(`Créez votre demande`)
    .setColor(bot.color.none)
    .setDescription(`Vous avez besoin de nous pour une quelconque aide ? \nVous pourrez directement discuter avec nous gratuitement et rapidement, ouvrez-en dès maintenant via la réaction suivante : \\🎟️. \n\nMerci de ne pas en abuser.`);
    
    message.channel.send(embed).then(m => {
    m.react('🎟️');
    });

}

exports.help = {
    name: "ticket",
    aliases: ['t', 'createticket', "openticket"]
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
