const { getLinks } = require('./messages')

const whoami = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err) } resolve(info.id) })
})

// BAD HACK: should use ssb-about plugin
const getAbout = async ({ id }, sbot) => {
  try {
    const sourceId = await whoami(sbot)
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

// BAD HACK: should use ssb-query plugin
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
  whoami,
  getAbout,
  getChannels,
}
