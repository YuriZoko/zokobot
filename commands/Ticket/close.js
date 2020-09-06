const Discord = require("discord.js");
const dateFormat = require("dateformat");

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Eh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));

    if(bot.db.has(`ticket.open.${message.author.id}`) && bot.db.get(`ticket.open.${message.author.id}.channel`) === message.channel.id){
        let userEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Fermé`)
        .setColor(bot.color.none)
        .setDescription(`L'auteur du ticket à procédé à la fermeture de celui-ci.`)
        .setTimestamp()
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .addField(`Informations`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        bot.db.delete(`ticket.open.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`)
        bot.db.delete(`ticket.open.${message.channel.id}`);
        await message.channel.delete();

    } else {

        if(args[0] === "force"){

            let embed1 = new Discord.MessageEmbed()
            .setAuthor(`Ticket clos ! 😥`)
            .setColor(bot.color.red)
            .setDescription(`Un membre de notre équipe vient de forcer la fermeture de votre ticket.`)
            .addFields(
                { name: 'Mon problème n\'est pas résolu ?!', value: `Si il n'est pas résolu, pas d'inquiétude, n'hésitez pas à réouvrir le ticket qui a été fermé et de nous indiquer la situation de ce dernier.` },
                { name: 'Fermé par', value: `${message.author.username}`, inline: true },
                { name: 'Canal', value: `${message.channel.name}`, inline: true },
            )
            .setTimestamp()

        bot.users.cache.get(`${bot.db.get(`ticket.open.${message.channel.id}.user`)}`).send(embed1).catch(e => {});
        bot.db.delete(`ticket.open.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`)
        bot.db.delete(`ticket.open.${message.channel.id}`);
        await message.channel.delete();

        } else {

        let embed2 = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setTitle(`Avez-vous d'autres questions ?`)
        .setDescription(`Un membre de notre équipe vient de remarquer que votre ticket est sur le point d'être abouti, afin de mener à bien la fin de ce dernier, nous aurons besoin que vous le fermiez.`)
        .addField(`Comment faire ?`, `Alors, c'est très simple ! Réagissez avec l'emoji : 🗑️, et pouf ! Votre ticket va disparaître, magique non ?!`);
        message.channel.send(embed2).then(m => m.react(`🗑️`));

        }

    }

}

exports.help = {
    name: "close",
    aliases: ['c', 'fermer', "closeticket"]
}

exports.requirements = {
    botOwner: false,
    botPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    userPerms: []
}
