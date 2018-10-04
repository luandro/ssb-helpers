const { getId, getAbout } = require('./lib/user')
const { getBlob } = require('./lib/blobs')
const { getConnectedPeers } = require('./lib/gossip')
const { getProgress } = require('./lib/replication')
const { getHistory, getHistoryStream } = require('./lib/replication')
const { publishMessage, getLinks, getMessagesByType, get } = require('./lib/messages')

module.exports = {
  get,
  getId,
  getAbout,
  getBlob,
  getConnectedPeers,
  getProgress,
  getHistory,
  getMessagesByType,
  getHistoryStream,
  getLinks,
  publishMessage,
}