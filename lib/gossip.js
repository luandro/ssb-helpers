'use strict';

var pull = require('pull-stream');

var getConnectedPeers = function getConnectedPeers(sbot, pubsub, channel, connected) {
  if (!sbot) {
    console.log('ERROR! Pass sbot to the function');
  }
  return pull(sbot.gossip.changes(), pull.filter(function (change) {
    if (connected) {
      return change.type === 'connect';
    }
    return change;
  }), pull.drain(function (gossip) {
    return pubsub.publish(channel, { gossip: gossip });
  }));
};

module.exports = {
  getConnectedPeers: getConnectedPeers
};