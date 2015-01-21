'use strict';
var crypto = require('crypto');
var domain = require('domain').create();
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Encode = function(data, key) {
  EventEmitter.call(this);
};

inherits(Encode, EventEmitter);

module.exports = function(data, appKey, callback) {
  var encode = new Encode();
  var jsonData;

  if (typeof (data) == 'string') 
    jsonData = data;
  else
    jsonData = JSON.stringify(data);

  //see if the string is valid json
  try {
    JSON.parse(jsonData);
  } catch(e) {
    return callback(new Error('invalid JSON'));
  }
   
  encode.on('done', function(token) {
    callback(null, token);
  }.bind(this));

  encode.on('derivedKeyDone', function(key) {
    var cipher = crypto.createCipheriv('aes-256-ctr', key, this.iv);
    var token = cipher.update(jsonData, 'utf8', 'base64');
    token += cipher.final('base64');
    encode.emit('done', token);
  }.bind(this));

  crypto.pbkdf2(appKey, this.salt, this.hashIterations, 32, function(err, derivedKey) {
    if (err) throw err;
    encode.emit('derivedKeyDone', derivedKey); 
  }.bind(this));
};
