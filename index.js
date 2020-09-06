const Discord = require("discord.js");
const config = require("./Storage/config.json");

const bot = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.event = new Discord.Collection();

const loadCommands = require("./functions/commands.js");
const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
}

bot.color = require("./Storage/color.json");
bot.functions = require("./functions/functions.js");
bot.db = require("quick.db");

load();
bot.login(config.token);