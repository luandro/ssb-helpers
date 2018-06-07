const pull = require('pull-stream')

const getConnectedPeers = (sbot, pubsub, channel, connected) => {
  if (!sbot) {
    console.log('ERROR! Pass sbot to the function')
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
  getConnectedPeers,
}

