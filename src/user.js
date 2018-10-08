const { getLinks } = require('./messages')

const getId = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err) } resolve(info.id) })
})

const getAbout = async ({ id }, sbot) => {
  try {
    const sourceId = await getId(sbot)
    const destId = id || sourceId
    const msgs = await getLinks({ source: destId, dest: destId, rel: 'about' }, sbot)
    const profile = Object.keys(msgs)
      .map((key) => msgs[key])
      .reduce((about, msg) => Object.assign(about, msg.value.content))
    const res = profile
    return res
  } catch (err) {
    const targetId = id || sourceId
    console.log('Error on getAbout', err)
    return { id: targetId, name: targetId }
  }
}

const getChannels = async ({ id }, sbot) => {
  const msgs = await getHistory({ id }, sbot);
  return Object.keys(msgs)
    .map((key) => msgs[key])
    .filter((msg) => msg.value.content.type === 'channel')
    .reduce((channels, msg) => {
      const { channel, subscribed } = msg.value.content;
      return [channels, { name: channel, subscribed }];
    }, []);
};

module.exports = {
  getId,
  getAbout,
  getChannels,
}
