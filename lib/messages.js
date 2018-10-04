'use strict';

var pull = require('pull-stream');
var ref = require('ssb-ref');

var getHistory = function getHistory(_ref, sbot) {
  var id = _ref.id,
      _ref$sequence = _ref.sequence,
      sequence = _ref$sequence === undefined ? 0 : _ref$sequence;
  return new Promise(function (resolve, reject) {
    if (!ref.isFeedId(id)) {
      reject(console.log(id + ' is not a valid feed ID'));
    }
    pull(sbot.createHistoryStream({ id: id, sequence: sequence }), pull.collect(function (err, msgs) {
      if (err) {
        reject(err);
      }resolve(msgs);
    }));
  });
};

var getMessagesByType = function getMessagesByType(_ref2, sbot) {
  var type = _ref2.type;
  return new Promise(function (resolve, reject) {
    pull(sbot.messagesByType({ type: type }), pull.collect(function (err, msgs) {
      if (err) {
        reject(err);
      }resolve(msgs);
    }));
  });
};

var getHistoryStream = function getHistoryStream(_ref3, sbot, pubsub, channel) {
  var id = _ref3.id,
      _ref3$sequence = _ref3.sequence,
      sequence = _ref3$sequence === undefined ? 0 : _ref3$sequence;

  if (!ref.isFeedId(id)) {
    reject(console.log(id + ' is not a valid feed ID'));
  }
  console.log('Starting', sbot.createHistoryStream);
  pull(sbot.createHistoryStream({ id: id, sequencex: sequencex }), pull.drain(function (message) {
    console.log('Got msg', message);
    return pubsub.publish(channel, { message: message });
  }));
};

var publishMessage = function publishMessage(content, sbot) {
  return new Promise(function (resolve, reject) {
    sbot.publish(content, function (err, msg) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(msg);
    });
  });
};

var getLinks = function getLinks(_ref4, sbot) {
  var source = _ref4.source,
      dest = _ref4.dest,
      rel = _ref4.rel;
  return new Promise(function (resolve, reject) {
    pull(sbot.links({ source: source, dest: dest, rel: rel, values: true }), pull.collect(function (err, msgs) {
      if (err) {
        reject(err);
      }resolve(msgs);
    }));
  });
};

module.exports = {
  getHistory: getHistory,
  getMessagesByType: getMessagesByType,
  getHistoryStream: getHistoryStream,
  publishMessage: publishMessage,
  getLinks: getLinks
};