const pull = require('pull-stream')

const peers = (sbot) => {
  const res = sbot.gossip.peers()
  console.log(res)
  return res
}

const gossip = (sbot, pubsub, channel, connected) => {
  if (!sbot || !pubsub || !channel) {
    console.log('ERROR! Pass sbot, pubsub and channel to the function')
  }
  return pull(
    sbot.gossip.changes(),
    pull.filter(change => {
      if (connected) {
        return change.type === 'connect'
      }
      return change
    }),
    pull.drain(gossip => {
      return pubsub.publish(channel, { gossip })
    })
  )
}

module.exports = {
  peers,
  gossip,
}

