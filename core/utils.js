const message = require('./message.js')

function isEmpty(string) {
  return string === undefined || string === null || string.trim() === ''
}

function getAuthor(msg) {
  return msg.author.username
}

function getFirstMention(msg) {
  return msg.mentions.members.first().user.username
}

function isFirstMentionAuthor(msg) {
  return msg.author.id === msg.mentions.members.first().user.id
}

function countMentions(msg) {
  return msg.mentions.members.size
}

function hasMention (msg) {
  return countMentions(msg) > 0
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}


function getMessage(msg) {
  let arr = msg.content.trim().split(' ')
  arr.shift()
  return arr.join(' ')
}

function sendText(msg, text) {
  let reply = new message.BaseMessage()
  reply.setTitle(text)
  msg.channel.send(reply)
}

function getContent(content) {
  if(content === undefined) return undefined
  if((typeof content) === 'string') return content
  if(content instanceof Function) return (async () => await content())()
  if(Array.isArray(content)) return getRandom(content)
}

function formatDate(data) {
  var d = data,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day,month,year].join('/')
}

exports.isEmpty = isEmpty
exports.getAuthor = getAuthor
exports.getFirstMention = getFirstMention
exports.countMentions = countMentions
exports.hasMention = hasMention
exports.getRandom = getRandom
exports.getMessage = getMessage
exports.sendText = sendText
exports.isFirstMentionAuthor = isFirstMentionAuthor
exports.getContent = getContent
exports.formatDate = formatDate