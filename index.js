const { getId, getProfile } = require('./src/user')
const { getConnectedPeers } = require('./src/gossip')
const { getProgress } = require('./src/replication')
const { getHistory, getHistoryStream } = require('./src/replication')
const { publishMessage, getLinks } = require('./src/messages')

module.exports = {
  getId,
  getProfile,
  getConnectedPeers,
  getProgress,
  getHistory,
  getHistoryStream,
  getLinks,
  publishMessage,
}