'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('./messages'),
    getLinks = _require.getLinks;

var getId = function getId(sbot) {
  return new Promise(function (resolve, reject) {
    sbot.whoami(function (err, info) {
      if (err) {
        reject(err);
      }resolve(info.id);
    });
  });
};

var getAbout = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, sbot) {
    var id = _ref2.id;

    var _sourceId, destId, msgs, profile, res, targetId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getId(sbot);

          case 3:
            _sourceId = _context.sent;
            destId = id || _sourceId;
            _context.next = 7;
            return getLinks({ source: destId, dest: destId, rel: 'about' }, sbot);

          case 7:
            msgs = _context.sent;
            profile = Object.keys(msgs).map(function (key) {
              return msgs[key];
            }).reduce(function (profile, msg) {
              return _extends({}, profile, msg.value.content);
            }, {});
            res = _extends({ id: destId }, profile);
            return _context.abrupt('return', res);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);
            targetId = id || sourceId;

            console.log('Error on getAbout', _context.t0);
            return _context.abrupt('return', { id: targetId, name: targetId });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 13]]);
  }));

  return function getAbout(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getChannels = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4, sbot) {
    var id = _ref4.id;
    var msgs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getHistory({ id: id }, sbot);

          case 2:
            msgs = _context2.sent;
            return _context2.abrupt('return', Object.keys(msgs).map(function (key) {
              return msgs[key];
            }).filter(function (msg) {
              return msg.value.content.type === 'channel';
            }).reduce(function (channels, msg) {
              var _msg$value$content = msg.value.content,
                  channel = _msg$value$content.channel,
                  subscribed = _msg$value$content.subscribed;

              return [].concat(_toConsumableArray(channels), [{ name: channel, subscribed: subscribed }]);
            }, []));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getChannels(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  getId: getId,
  getAbout: getAbout,
  getChannels: getChannels
};