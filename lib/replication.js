'use strict';

var pull = require('pull-stream');

var getProgress = function getProgress(sbot, pubsub, channel) {
  if (!sbot) {
    console.log('ERROR! Pass sbot to the function');
  }
  pull(sbot.replicate.changes(), pull.drain(function (progress) {
    return pubsub.publish(channel, { progress: progress });
  }));
};

module.exports = {
  getProgress: getProgress
};