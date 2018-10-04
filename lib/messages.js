'use strict';

var pull = require('pull-stream');
var ref = require('ssb-ref');

var get = function get(_ref, sbot) {
  var msgid = _ref.msgid;
  return new Promise(function (resolve, reject) {
    pull(sbot.get({ msgid: msgid }), pull.collect(function (err, msgs) {
      if (err) {
        reject(err);
      }resolve(msgs);
    }));
  });
};

var getHistory = function getHistory(_ref2, sbot) {
  var id = _ref2.id,
      _ref2$sequence = _ref2.sequence,
      sequence = _ref2$sequence === undefined ? 0 : _ref2$sequence;
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

var getMessagesByType = function getMessagesByType(_ref3, sbot) {
  var type = _ref3.type;
  return new Promise(function (resolve, reject) {
    pull(sbot.messagesByType({ type: type }), pull.collect(function (err, msgs) {
      if (err) {
        reject(err);
      }resolve(msgs);
    }));
  });
};

var getHistoryStream = function getHistoryStream(_ref4, sbot, pubsub, channel) {
  var id = _ref4.id,
      _ref4$sequence = _ref4.sequence,
      sequence = _ref4$sequence === undefined ? 0 : _ref4$sequence;

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

var getLinks = function getLinks(_ref5, sbot) {
  var source = _ref5.source,
      dest = _ref5.dest,
      rel = _ref5.rel;
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
  get: get,
  getLinks: getLinks
};