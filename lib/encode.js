'use strict';
var crypto = require('crypto');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Encode = function(data, key) {
  EventEmitter.call(this);
};

inherits(Encode, EventEmitter);

module.exports = function(data, appKey, callback) {
  var encode = new Encode();

  encode.on('done', function(token) {
    callback(token);
  }.bind(this));

  encode.on('derivedKeyDone', function(key) {
    var cipher = crypto.createCipheriv('aes-256-ctr', key, this.iv);
    var token = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    token += cipher.final('base64');
    encode.emit('done', token);
  }.bind(this));

  crypto.pbkdf2(appKey, this.salt, 10, 32, function(err, derivedKey) {
    if (err) throw err;
    this.key = derivedKey;
    encode.emit('derivedKeyDone', derivedKey); 
  }.bind(this));
};
