const pull = require('pull-stream')

const getBlob = (sbot, hash) => new Promise((resolve, reject) => {
  pull(
    sbot.blobs.get(hash),
    pull.collect((err, blob) => { if (err) { reject(err) } resolve(blob) }),
  )
})

module.exports = {
  getBlob,
}