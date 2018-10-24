const pull = require('pull-stream')

function formatBlob (hash, paths) {
  const formatedHash = hash.split('.sha256').shift().split('').slice(1).join('')
  const hex = new Buffer(formatedHash, 'base64').toString('hex')
  const dir = hex.substring(0,2)
  const file = hex.substring(2)
  const blobPath = `${paths.ssbPath}/blobs/sha256/${dir}/${file}`
  return {
    key: hash,
    hex,
    path: blobPath
  }
}

const blob = (sbot, hash, paths) => new Promise((resolve, reject) => {
  sbot.blobs.want(hash, (err) => {
    if (err) reject(err)
    pull(
      sbot.blobs.get(hash),
      pull.collect((err, blob) => {
        console.log('Here is the blob: ', blob)
        if (err) {
          reject(err)
        }
        const formatedBlob = formatBlob(hash, paths)
        resolve(formatedBlob)
      }),
    )
  })
})

//TODO
// const blobAdd = (sbot, hash, paths) => {
//   pull(
//     source,
//     add(hash, cb))
// }

const blobRemove = async (sbot, hash, paths) => {
  return sbot.blobs.rm(hash, (err) => {
    if (err) reject(err) 
    const formatedBlob = formatBlob(hash, paths)
    return formatedBlob
  })
}

const blobsList = (sbot, pubsub, channel, paths) => {
  if (!sbot || !pubsub || !channel) {
    console.log('ERROR! Pass sbot, pubsub and channel to the function')
  }
  return pull(
    sbot.blobs.ls(),
    pull.drain(blob => {
      const formatedBlob = formatBlob(blob, paths)
      // console.log(channel, formatedBlob)
      return pubsub.publish(channel, { blobsList: formatedBlob })
    })
  )
}

const blobChanges = (sbot, pubsub, channel, paths) => {
  if (!sbot || !pubsub || !channel) {
    console.log('ERROR! Pass sbot, pubsub and channel to the function')
  }
  return pull(
    sbot.blobs.changes(),
    pull.drain(blob => {
      // console.log(channel, blob)
      const formatedBlob = formatBlob(blob, paths)
      return pubsub.publish(channel, { blobsChanges: formatedBlob })
    })
  )
}

module.exports = {
  blob,
  blobsList,
  blobRemove,
  blobChanges,
}