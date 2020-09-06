const Discord = require("discord.js");

module.exports = async (bot) => {

    console.log(`${bot.user.username} is ready !`);
    bot.user.setActivity('les tickets 👀', { type: 'WATCHING' });


}