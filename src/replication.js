const pull = require('pull-stream')

const getProgress = (sbot, pubsub, channel) => {
  if (!sbot) {
    console.log('ERROR! Pass sbot to the function')
  }
  pull(
    sbot.replicate.changes(),
    pull.drain(progress => pubsub.publish(channel, { progress }))
  )
}

module.exports = {
  getProgress,
}
