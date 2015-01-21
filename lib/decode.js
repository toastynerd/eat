'use strict';

var crypto = require('crypto');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Decode = function() {
  EventEmitter.call(this);
};

inherits(Decode, EventEmitter);

module.exports = function(token, appKey, callback) {
  var decode = new Decode();

  decode.on('done', function(decoded) {
    var decodedJSON;
    try {
      decodedJSON = JSON.parse(decoded);
    } catch(e) {
      return callback(new Error('could not decode token'));
    }
    callback(null, decodedJSON);
  });

  decode.on('derivedKeyDone', function(key) {
    var decipher = crypto.createDecipheriv('aes-256-ctr', key, this.iv);
    var decoded = decipher.update(token, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    decode.emit('done', decoded);
  }.bind(this));

  crypto.pbkdf2(appKey, this.salt, this.hashIterations, 32, function(err, derivedKey) {
    if (err) throw err;
    decode.emit('derivedKeyDone', derivedKey);
  }.bind(this));
};
