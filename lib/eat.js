'use strict';

var crypto = require('crypto');
var encode = require('./encode');
var decode = require('./decode');

var Eat = function(options) {
  options = options || {};
  this.saltSize = options.saltSize || 32;
  this.hashIterations = options.hashIterations || 16;
  this.salt = crypto.randomBytes(this.saltSize);
  this.iv = crypto.randomBytes(16);
};

Eat.prototype.genSalt = function(callback) {
  crypto.randomBytes(this.saltSize, function(err, buf) {
    this.salt = buf;
    callback();  
  }.bind(this));
};

Eat.prototype.geniv = function(callback) {
  crypto.randomBytes(32, function(err, buf) {
    this.iv = buf;
    callback();  
  }.bind(this));
};

Eat.prototype.encode = encode;
Eat.prototype.decode = decode;

var eat = new Eat();

module.exports = eat;
