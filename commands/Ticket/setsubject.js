const Discord = require("discord.js");
const dateFormat = require("dateformat");

exports.run = async (bot, message, args) => {

    let notTicket = new Discord.MessageEmbed()
        .setColor(bot.color.red)
        .setAuthor(`⛔ | Eh non ..`)
        .setDescription(`Ce n'est pas un salon ticket.`);

    if(!bot.db.has(`ticket.open.${message.channel.id}`)) return message.reply({embed: notTicket}).then(m => m.delete({timeout: 5000}).catch(e => {}));
    if(bot.db.get(`ticket.open.${message.channel.id}.suspendu`) === "Oui") return bot.functions.error(message.channel, "Ce ticket est suspendu, vous ne pouvez pas changer le sujet.")

    let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");

    if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

    if(!message.guild.member(message.author).roles.cache.has(poleDirection.id)){return bot.functions.error(message.channel, `Le staff a besoin de ce rôle pour voir les tickets.`)}

    let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];

    let cat = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
    if(!cat) cat = await message.guild.channels.create("tickets", {type: "category", position: 1, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: poleDirection.id }, { allow: permsToHave, id: poleTechnique.id }, { allow: permsToHave, id: poleCommercial.id }, { allow: permsToHave, id: poleSupport.id } ]}).catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});

    let mail = "";
    if(bot.db.has(`email.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`) && bot.db.get(`email.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`) !== null) mail = `(${bot.db.get(`email.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`)})`;

    let selectedSubject = args[0];
    if(!selectedSubject) return bot.functions.error(message.channel, "Veuillez indiquer un sujet.");
    await sleep(3000);

    if(selectedSubject === "1" || selectedSubject === "chien"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        chienPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `chien-${chienPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Chien contrôlable, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Chien contrôlable\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "chien");
      }

      else if(selectedSubject === "2" || selectedSubject === "repair"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        repairPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `repair-${repairPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Restriction de réparation, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Restriction de réparation\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "repair");
      }

      else if(selectedSubject === "3" || selectedSubject === "farms"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        farmsPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `farms-${farmsPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Restriction de farms illégaux, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Restriction de farms illégaux\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "farms");
      }

      else if(selectedSubject === "4" || selectedSubject === "documents"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        docPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `documents-${docPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Advanced Documents, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Advanced Documents\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "documents");
      }

      else if(selectedSubject === "5" || selectedSubject === "djs"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        carbootPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `carboot-${carbootPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : CarBoot, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`CarBoot\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "carboot");
      }

      else if(selectedSubject === "6" || selectedSubject === "install"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        installPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `install-${installPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Installation, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Installation\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "install");
      }

      else if(selectedSubject === "7" || selectedSubject === "partner"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        partnerPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `partenariats-${partnerPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Partenariats, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Partenariats\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "partner");
      }

      else if(selectedSubject === "8" || selectedSubject === "autres"){
        if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
        partenariatPad = `${bot.db.get(`subject.all`)}`;
        message.channel.edit({ name: `autres-${autresPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Autres demandes, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
        bot.functions.success(message.channel, "Le ticket a été déplacé dans : \`Partenariat\`.")
        bot.db.set(`ticket.open.${message.channel.id}.sujet`, "autres");
      } else {
        message.channel.send(`:x: Votre réponse ne correspond à aucun numéro ci-dessus, veuillez entrer le numéro d'un produit valide pour qu'un de nos agents puisse traiter votre demande.`)
      }

}

exports.help = {
    name: "setsubject",
    aliases: ['ss']
}

exports.requirements = {
    botOwner: false,
    botPerms: [],
    userPerms: []
}
