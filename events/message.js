const Discord = require("discord.js");
const dateFormat = require("dateformat");
const gutil = require("gulp-util");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async (bot, message) => {

    let prefix = "!";
    let owners = ['266216413356621835'];

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    if(message.channel.type === "dm") return;
    if(message.author.bot) return;

        let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");
        let gradeChef = message.guild.roles.cache.find(r => r.name === "Chef de projet");
        if(!gradeChef) message.guild.roles.create({data:{name: "Chef de projet", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
        let tagstaff = message.guild.channels.cache.find(c => c.name === "tag-staff");
        if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});
        if(!tagstaff) return message.channel.send(`:x: ${message.guild.owner}, Aucun salon nommé \`tag-staff\` n'a été trouvé. Merci d'en créer un.`);

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];

    let messageDeSucces = '';

    let cat = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
    if(!cat) cat = await message.guild.channels.create("tickets", {type: "category", position: 1, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id } ]}).catch(e => {return bot.functions.error(message.channel, "Une erreur a été rencontrée.")});

    if(!bot.db.has(`email.${message.author.id}`) || bot.db.get(`email.${message.author.id}`) === undefined || bot.db.get(`email.${message.author.id}`) === null) messageDeSucces = `:incoming_envelope: Le/les pôle(s) de sujet ont été notifiés ! Vous n'avez jamais lié votre compte HelvetiaHost à Discord.\nPourriez-vous nous transmettre votre adresse e-mail afin de vous aider plus facilement via la commande : \`!setemail your@email.tld\``;
    else messageDeSucces = `:incoming_envelope: Le/les pôle(s) de sujet ont été notifiés, ils répondront ici dès que possible. Veuillez vous assurer de nous donner le **maximum de détails** afin que nous puissions répondre le plus précisément possible à votre demande. \n**Quel est l'objet de votre demande ?**`;

    let mail = "";
    if(bot.db.has(`email.${message.author.id}`) && bot.db.get(`email.${message.author.id}`) !== null) mail = `(${bot.db.get(`email.${message.author.id}`)})`;
    await sleep(2000);

    if(message.channel.name.startsWith(`ticket-`) && !message.author.bot && message.author.id === bot.db.get(`ticket.open.${message.channel.id}.user`)){
        if(message.content === "1"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            chienPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `chien-${chienPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Chien contrôlable, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "chien");
          }

          else if(message.content === "2"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            repairPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `repair-${repairPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Restriction de réparation, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "repair");
          }

          else if(message.content === "3"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            farmsPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `farms-${farmsPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Restriction de farms illégaux, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "farms");
          }

          else if(message.content === "4"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            docPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `documents-${docPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Advanced Documents, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "documents");
          }

          else if(message.content === "5"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            carbootPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `carboot-${carbootPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : CarBoot, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "carboot");
          }

          else if(message.content === "6"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            installPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `install-${installPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Installation, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "install");
          }

          else if(message.content === "7"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            partnerPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `partenariats-${partnerPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Partenariats, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "partner");
          }

          else if(message.content === "8"){
            if(!bot.db.has(`subject.all`) || bot.db.get(`subject.all`) === undefined || bot.db.get(`subject.all`) === null) bot.db.set(`subject.all`, 0);
            autresPad = `${bot.db.get(`subject.all`)}`;
            message.channel.edit({ name: `autres-${autresPad.padStart(4, '0')}`, parentID: cat.id, topic: `Sujet concerné : Autres demandes, créé le ${dateFormat(new Date(), "dd/mm/yyyy - HH")}h${dateFormat(new Date(), "MM")} par ${message.author.username} ${mail}`, permissionOverwrites:[ { deny: permsToHave, id: message.guild.id }, { allow: permsToHave, id: grade.id }, { allow: permsToHave, id: gradeChef.id }, { allow: permsToHave, id: message.author.id } ]});
            message.channel.send(`${messageDeSucces}`);
            tagstaff.send(`Un nouveau ticket à été ouvert par \`${message.author.username}\` via ${message.channel}.`);
            bot.db.add(`subject.all`, 1);
            bot.db.set(`ticket.open.${message.channel.id}.sujet`, "autres");
          } else {
            message.channel.send(`:x: Votre réponse ne correspond à aucun numéro ci-dessus, veuillez entrer le numéro d'un produit valide pour qu'un de nos agents puisse traiter votre demande.`)
          }
    }

    if(!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !cmd) return;
    if(cmd.requirements.botOwner && cmd.requirements.botOwner === true && !owners.includes(message.author.id)) return bot.functions.error(message.channel, "Désolé, seul le développeur du bot est autorisé à utiliser cette commande.");
    if(cmd.requirements.botPerms && cmd.requirements.botPerms.length > 0 && !message.guild.me.hasPermission(cmd.requirements.botPerms)) return bot.functions.error(message.channel, `Désolé, je n'ai pas les permissions \`${message.guild.me.permissions.missing(cmd.requirements.botPerms).join(", ").replace(/_/gi, " ")}\`.`);
    if(cmd.requirements.userPerms && cmd.requirements.userPerms.length > 0 && !message.member.hasPermission(cmd.requirements.userPerms)) return bot.functions.error(message.channel, `Désolé, vous n'avez pas les permissions \`${message.member.permissions.missing(cmd.requirements.userPerms).join(", ").replace(/_/gi, " ")}\`.`);

    cmd.run(bot, message, args).catch(e => {return console.log(e)});

    if(cmd){
        console.log(gutil.colors.yellow(`[${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}]`) + gutil.colors.magenta(` (${message.guild.name} | ${message.guild.id}) ${cmd.help.name.toUpperCase()} : ${message.author.tag} | ${message.author.id}`));
    }

} 