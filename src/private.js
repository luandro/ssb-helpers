const unbox = ({ ciphertext }, sbot) => {
  return unbox(ciphertext, (err, msg) => {
    if (err) console.log('ERR on ssb-helpers', err)
    console.log('MSG', msg)
    return msg
  })
}


const publishPrivate = ({ content, recps }, sbot) => {
  return sbot.private.publish(content, recps, (err, msg) => {
    if (err) console.log('ERR on ssb-helpers', err)
    console.log('MSG', msg)
    return msg
  })

}

module.exports = {
  unbox,
  publishPrivate
}