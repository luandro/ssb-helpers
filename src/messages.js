const pull = require('pull-stream')
const ref = require('ssb-ref')

const getHistory = ({ id, sequence = 0 }, sbot) => new Promise((resolve, reject) => {
  if (!ref.isFeedId(id)) { reject(console.log(`${id} is not a valid feed ID`)) }
  pull(
    sbot.createHistoryStream({ id, sequence }),
    pull.collect((err, msgs) => { if (err) { reject(err) } resolve(msgs) }),
  )
})

const getMessagesByType = ({ type }, sbot) => new Promise((resolve, reject) => {
  pull(
    sbot.messagesByType({ type }),
    pull.collect((err, msgs) => { if (err) { reject(err) } resolve(msgs) }),
  )
})

const getHistoryStream = ({ id, sequence = 0 }, sbot, pubsub, channel) => {
  if (!ref.isFeedId(id)) { reject(console.log(`${id} is not a valid feed ID`)) }
  console.log('Starting', sbot.createHistoryStream)
  pull(
    sbot.createHistoryStream({ id, sequencex }),
    pull.drain(message => {
      console.log('Got msg', message)
      return pubsub.publish(channel, { message })
    }),
  )
}

const publishMessage = (content, sbot) => new Promise((resolve, reject) => {
  sbot.publish(content, (err, msg) => {
    if (err) {
      console.log(err)
      reject(err)
    }
    resolve(msg)
  })
})

const getLinks = ({ source, dest, rel }, sbot) => new Promise((resolve, reject) => {
  pull(
    sbot.links({ source, dest, rel, values: true }),
    pull.collect((err, msgs) => { if (err) { reject(err) } resolve(msgs) }),
  )
})

module.exports = {
  getHistory,
  getMessagesByType,
  getHistoryStream,
  publishMessage,
  getLinks,
}