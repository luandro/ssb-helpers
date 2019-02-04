const { getLinks } = require('./messages')

const whoami = (sbot) => new Promise((resolve, reject) => {
  sbot.whoami((err, info) => { if (err) { reject(err) } resolve(info.id) })
})

const getAbout = async ({ id }, sbot) => {
  const dest = id || await whoami(sbot)
  keys = ['name', 'image', 'location']
  return new Promise((resolve, reject) => {
    sbot.about.latestValues({ keys, dest }, (err, values) => {
      resolve(Object.assign({key: dest}, values))
    })
  })
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
