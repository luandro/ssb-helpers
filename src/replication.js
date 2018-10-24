const pull = require('pull-stream')

const replication = (sbot, pubsub, channel) => {
  if (!sbot || !pubsub || !channel) {
    console.log('ERROR! Pass sbot, pubsub and channel to the function')
  }
  pull(
    sbot.replicate.changes(),
    pull.drain(replication => pubsub.publish(channel, { replication }))
  )
}

module.exports = {
  replication,
}
