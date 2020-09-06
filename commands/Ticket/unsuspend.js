const Discord = require("discord.js");
const dateFormat = require("dateformat");

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
    let gradeChef = message.guild.roles.cache.find(r => r.name === "Chef de projet");
    if(!gradeChef) message.guild.roles.create({data:{name: "Chef de projet", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
    let tagstaff = message.guild.channels.cache.find(c => c.name === "tag-staff");
    if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
    if(!tagstaff) return message.channel.send(`:x: ${message.guild.owner}, Aucun salon nommé \`tag-staff\` n'a été trouvé. Merci d'en créer un.`);

    if(!message.guild.member(message.author).roles.cache.has(grade.id)){return bot.functions.error(message.channel, `Seuls les membres de l'équipe peuvent utiliser la commande.`)}
    if(bot.db.get(`ticket.open.${message.channel.id}.suspendu`) === "Non") return bot.functions.error(message.channel, "Désolé, ce ticket n'est pas suspendu.");

    let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];

    let cat = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
    if(!cat) cat = await message.guild.channels.create("tickets", {type: "category", position: 1, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: poleTechnique.id } ]}).catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});

    let mail = "";
    if(bot.db.has(`email.${message.author.id}`) && bot.db.get(`email.${message.author.id}`) !== null) mail = `(${bot.db.get(`email.${message.author.id}`)})`;
    await sleep(3000);

        if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "chien"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            chienPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `chien-${chienPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Chien contrôlable, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "chien");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "repair"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            repairPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `repair-${repairPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Serveur de Jeux, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "repair");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "farms"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            farmsPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `farms-${farmsPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Boîte de Stockage, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "farms");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "documents"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            docPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `documents-${docPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Serveurs Dédiés, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "documents");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "carboot"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            carbootPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `carboot-${carbootPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Discord.JS, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "carboot");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "install"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            installPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `install-${installPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Direction, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "install");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "partner"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            partnerPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `partenariats-${partnerPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Recrutement, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "partner");
          }

          else if(bot.db.get(`ticket.open.${message.channel.id}.sujet`) === "autres"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            autresPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `autres-${autresPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Partenariat, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.guild.members.cache.find(m => m.id === bot.db.get(`ticket.open.${message.channel.id}.user`)).id } ]});
            bot.functions.success(message.channel, "Le ticket n'est plus suspendu !");
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "autres");
          }

    bot.db.set(`ticket.open.${message.channel.id}.suspendu`, "Non");

}

exports.help = {
    name: "unsuspend",
    aliases: ['unsus']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
