const { getLinks } = require('./messages')
const { getBlob } = require('./blobs')

const getId = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err) } resolve(info.id) })
})

const getProfile = async ({ id }, sbot) => {
  try {
    const msgs = await getLinks({ source: id, dest: id, rel: 'about' }, sbot)
    const profile = Object.keys(msgs)
      .map((key) => msgs[key])
      .reduce((profile, msg) => ({ ...profile, ...msg.value.content }), {})
    let blobJson = null
    if (profile.image) {
      const imgBlob = await getBlob(sbot, profile.image)
      blobJson = JSON.stringify(imgBlob)

    }
    const res = { id, ...profile, imageBlob: blobJson }
    return res
  } catch (err) {
    console.log('Error on getProfile', err)
    return { id, name: id }
  }
}

const getChannels = async ({ id }, sbot) => {
  const msgs = await getHistory({ id }, sbot);
  return Object.keys(msgs)
    .map((key) => msgs[key])
    .filter((msg) => msg.value.content.type === 'channel')
    .reduce((channels, msg) => {
      const { channel, subscribed } = msg.value.content;
      return [...channels, { name: channel, subscribed }];
    }, []);
};

module.exports = {
  getId,
  getProfile,
  getChannels,
}
