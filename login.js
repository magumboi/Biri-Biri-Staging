/* --------------

    Biribiri Bot

--------------- */
console.time('total')
let env = process.env.NODE_ENV || 'dev';

if(env === 'production') {
  console.time('SENTRY')
  var Raven = require('raven');
  Raven.config(process.env.SENTRY_URI, {
    captureUnhandledRejections: true
  }).install()
  console.timeEnd('SENTRY')
}

console.time('discord')
const Discord = require('discord.js')
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0})
bot.login(process.env.BOT_TOKEN)
console.timeEnd('discord')

console.time('dispatcher')
const startup = require('./startup.js')
const reaction = require('./reaction.js')
startup.startup(bot)
reaction.reaction(bot)

// Command register
const prefix = 'n!'
const ds = require('./core/dispatcher.js')
const clients = require("./core/clients.js")
let dispatcher = new ds.Dispatcher(prefix, bot, clients)
dispatcher.add('../commands/admin.js')
dispatcher.add('../commands/changelog.js')
dispatcher.add('../commands/custom.js')
dispatcher.add('../commands/cute.js')
dispatcher.add('../commands/help.js')
dispatcher.add('../commands/meme.js')
dispatcher.add('../commands/misc.js')
dispatcher.add('../commands/neko.js')
dispatcher.add('../commands/nsfw.js')
dispatcher.add('../commands/ship.js')
dispatcher.add('../commands/trello.js')
dispatcher.register()
console.timeEnd('dispatcher')

// Emmit bot metrics every 10 seconds
console.time('datadog')
setInterval(() => {
  clients.dogstatsd.histogram('discord.users', bot.users.size)
  clients.dogstatsd.histogram('discord.servers', bot.guilds.size)
  clients.dogstatsd.histogram('discord.latency', bot.ping)
}, 10 * 1000)
console.timeEnd('datadog')
console.timeEnd('total')