'use strict';

var pull = require('pull-stream');

var getBlob = function getBlob(sbot, hash) {
  return new Promise(function (resolve, reject) {
    sbot.blobs.want(hash, function (err) {
      if (err) reject(err);
      pull(sbot.blobs.get(hash), pull.collect(function (err, blob) {
        if (err) {
          reject(err);
        }resolve(blob);
      }));
    });
  });
};

module.exports = {
  getBlob: getBlob
};