const pull = require('pull-stream')

const getBlob = (sbot, hash) => new Promise((resolve, reject) => {
  sbot.blobs.want(hash, (err) => {
    if (err) reject(err)
    pull(
      sbot.blobs.get(hash),
      pull.collect((err, blob) => { if (err) { reject(err) } resolve(blob) }),
    )
  })
})

module.exports = {
  getBlob,
}