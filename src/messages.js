const pull = require('pull-stream')
const ref = require('ssb-ref')

const format = (msg, id) => {
  let formatedMessage = {}
  formatedMessage.key = id
  formatedMessage.type = msg.content.type
  formatedMessage.value = msg
  return formatedMessage
}

const message = ({ id }, sbot) =>  new Promise((resolve, reject) => {
  return sbot.get(id, (err, msg) => {
    if (err) reject(err)
    const formated = format(msg, id)
    resolve(formated)
  })
})

const publish = (content, sbot) => new Promise((resolve, reject) => {
  sbot.publish(content, (err, msg) => {
    if (err) {
      console.log(err)
      reject(err)
    }
    resolve(msg)
  })
})

const messagesByType = ({ type }, sbot, pubsub, channel) => {
  pull(
    sbot.messagesByType({ type }),
    pull.drain(messagesByType => {
      console.log('msg', messagesByType)
      return pubsub.publish(channel, { messagesByType })
    })
  )
}

const getMessagesByType = ({ type }, sbot) => new Promise((resolve, reject) => {
  pull(
    sbot.messagesByType({ type }),
    pull.collect((err, msgs) => { if (err) { reject(err) } resolve(msgs) })
  )
})

const feed = (sbot, pubsub, channel) => {
  if (!sbot || !pubsub || !channel) {
    console.log('ERROR! Pass sbot, pubsub and channel to the function')
  }
  pull(
    sbot.createFeedStream(),
    pull.drain(feed => pubsub.publish(channel, { feed }))
  )
}

const getHistory = ({ id, sequence = 0 }, sbot) => new Promise((resolve, reject) => {
  if (!ref.isFeedId(id)) { reject(console.log(`${id} is not a valid feed ID`)) }
  pull(
    sbot.createHistoryStream({ id, sequence }),
    pull.collect((err, msgs) => { if (err) { reject(err) } resolve(msgs) }),
  )
})

const history = ({ id, sequence = 0 }, sbot, pubsub, channel) => {
  if (!ref.isFeedId(id)) { reject(console.log(`${id} is not a valid feed ID`)) }
  console.log('Starting', sbot.createHistoryStream)
  pull(
    sbot.createHistoryStream({ id, sequence }),
    pull.drain(history => pubsub.publish(channel, { history })),
  )
}

const log = (sbot, pubsub, channel) => {
  pull(
    sbot.createLogStream(),
    pull.drain(message => {
      console.log('Got msg', message)
      let formatedMessage = message.value
      formatedMessage.key = message.key
      return pubsub.publish(channel, { log: formatedMessage })
    }),
  )
}

const links = ({ source, dest, rel }, sbot) => new Promise((resolve, reject) => {
  pull(
    sbot.links({ source, dest, rel, values: true }),
    pull.drain((err, msgs) => { if (err) { reject(err) } resolve(msgs) }),
  )
})

module.exports = {
  getMessagesByType,
  messagesByType,
  publish,
  message,
  feed,
  log,
  getHistory,
  history,
  links,
}