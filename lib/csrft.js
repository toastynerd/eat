'use strict';

var crypto = require('crypto');
var encode = require('./encode');
var decode = require('./decode');

var Csrft = function() {
  this.salt = crypto.randomBytes(8);
  this.iv = crypto.randomBytes(16);
};

Csrft.prototype.genSalt = function(callback) {
  crypto.randomBytes(8, function(err, buf) {
    this.salt = buf;
    callback();  
  }.bind(this));
};

Csrft.prototype.geniv = function(callback) {
  crypto.randomBytes(32, function(err, buf) {
    this.iv = buf;
    callback();  
  }.bind(this));
};

Csrft.prototype.encode = encode;
Csrft.prototype.decode = decode;

var csrft = new Csrft();
csrft.genSalt();

module.exports = csrft;
