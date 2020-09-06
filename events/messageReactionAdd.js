const Discord = require('discord.js');
const dateFormat = require('dateformat');

module.exports = async (bot, reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;

  let logsChannel = message.guild.channels.cache.find(c => c.id === bot.db.get(`logs_${message.guild.id}`));

  let already = new Discord.MessageEmbed()
  .setColor(bot.color.red)
  .setTitle(`Navré, mais vous ne pouvez avoir qu'un seul ticket !`)
  .setDescription(`Notre équipe a autorisé seulement un seul ticket à la fois.`)
  .setTimestamp();

  let success = new Discord.MessageEmbed()
  .setColor(bot.color.green)
  .setTitle(`Tout d'abord, indiquez-nous l'objet de votre demande`)
  .setDescription(`Veuillez expliquer la raison de votre demande. Un membre de l'équipe prendra en charge votre ticket sous peu.`)
  .addField(`Comment sélectionner un sujet ?`, `Pour sélectionner un sujet, il suffit de répondre à ce message par le numéro qui concerne votre demande.`)
  .addField(`Produits`, `1 - Chien contrôlable\n2 - Restriction de réparation\n3 - Restriction de farms illégaux\n4 - Advanced Documents\n5 - Immobilisation\n6 - Installation`, true)
  .addField(`Autres demandes`, `7 - Partenariats\n8 - Autres demandes`, true);

  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  // ∎∎∎∎∎∎∎∎∎∎∎∎∎∎ OUVERTURE DU TICKET ∎∎∎∎∎∎∎∎∎∎∎∎∎∎ //

  if(message.embeds.length === 1 && message.embeds[0].title === 'Créez votre demande' && message.embeds[0].description.includes('Vous avez besoin de nous pour une quelconque aide ?')){
    if(reaction.emoji.name === "🎟️"){
      if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}` || bot.db.has(`ticket.open.${user.id}`))){

        let grade = message.guild.roles.cache.find(r => r.name === "Zoko-Scripts Team");

        if(!grade) message.guild.roles.create({data:{name: "Zoko-Scripts Team", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

        let gradeChef = message.guild.roles.cache.find(r => r.name === "Chef de projet");
        if(!gradeChef) message.guild.roles.create({data:{name: "Chef de projet", permissions: 0}, reason: 'Le staff a besoin de ce rôle pour voir les tickets.'});

        let categoria = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return bot.functions.error(message, message.channel, "Une erreur a été rencontrée.")});

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'];

        let mail = "";
        if(bot.db.has(`email.${user.id}`) && bot.db.get(`email.${user.id}`) !== null) mail = `(${bot.db.get(`email.${user.id}`)})`;

        message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: permsToHave,
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: grade.id
          },
          {
            allow: permsToHave,
            id: gradeChef.id
          },
        ],
        parent: categoria.id,
        reason: `Cet utilisateur a besoin d'aide.`,
        topic: `Aucun sujet choisi, créé le ${dateFormat(new Date(), 'HH:MM:ss - dd/mm/yyyy')} par ${user.tag} ${mail}`
      }).then(async channel => {

        let createdEmbed = new Discord.MessageEmbed()
        .setAuthor(`📝 | Ticket Ouvert`)
        .setTimestamp()
        .setColor(bot.color.none)
        .setFooter(`Système de Ticket`, bot.user.displayAvatarURL())
        .setDescription(`Un utilisateur à ouvert un ticket et attend qu'on s'occupe de sa demande.`)
        .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(createdEmbed);
        channel.send(`Bonjour ${user} ! Je suis là pour vous aider, je vais vous accompagner jusqu'à la résolution de votre problème.\n\nUn de nos agents va bientôt s'occuper de vous mais nous avons quelques questions à vous poser afin de vous diriger vers le **bon service** ! :stuck_out_tongue_winking_eye:`, {embed: success});
        bot.db.set(`ticket.open.${user.id}`, { channel: channel.id, userid: user.id, date: `${dateFormat(new Date(), 'HH:MM:ss - dd/mm/yyyy')}`, sujet: "Aucun", suspendu: "Non", private: "Non" });
        bot.db.set(`ticket.open.${channel.id}`, { channel: channel.id, user: user.id, date: `${dateFormat(new Date(), 'HH:MM:ss - dd/mm/yyyy')}`, sujet: "Aucun", suspendu: "Non", private: "Non" });
      })
      reaction.users.remove(user.id);
      return;
    } else {
      reaction.users.remove(user.id);
      message.send({embed: already}).then(m => m.delete({timeout: 15000}).catch(e => {}));
    }
    } else {
      reaction.users.remove(user.id);
    }
  }

  // ∎∎∎∎∎∎∎∎∎∎∎∎∎∎ FERMETURE DU TICKET ∎∎∎∎∎∎∎∎∎∎∎∎∎∎ //

  if(message.embeds.length === 1 && message.embeds[0].title === 'Avez-vous d\'autres questions ?'){
    if(reaction.emoji.name === "🗑️"){
      if(bot.db.get(`ticket.open.${message.channel.id}.user`) === user.id){

        let deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Fermé`)
        .setColor(bot.color.none)
        .setDescription(`L'auteur a confirmé la fermeture du ticket.`)
        .setTimestamp()
        .setFooter(`Système de Ticket`, bot.user.displayAvatarURL())
        .addField(`Informations`, `**Utilisateur :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        bot.db.delete(`ticket.open.${bot.db.get(`ticket.open.${message.channel.id}.user`)}`);
        bot.db.delete(`ticket.open.${message.channel.id}`);
        await message.channel.delete();

      }
    }
  }

}