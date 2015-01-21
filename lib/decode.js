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
    callback(JSON.parse(decoded));
  });

  decode.on('derivedKeyDone', function(key) {
    var decipher = crypto.createDecipheriv('aes-256-ctr', this.key, this.iv);
    var decoded = decipher.update(token, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    decode.emit('done', decoded);
  }.bind(this));

  crypto.pbkdf2(appKey, this.salt, 10, 32, function(err, derivedKey) {
    if (err) throw err;
    decode.emit('derivedKeyDone', derivedKey);
  }.bind(this));
};
