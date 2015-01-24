'use strict';

var expect = require('chai').expect;
var eat = require('../index');

describe('encode and decode', function() {
  var token;
  before(function(done) {
    eat.encode({hello: 'world'}, 'testpassword', function(err, encrypted) {
      token = encrypted;
      done();
    });
  });

  it('should be able to decode with the same key', function(done) {
    eat.decode(token, 'testpassword', function(err, decoded) {
      expect(err).to.eql(null);
      expect(decoded.hello).to.eql('world');
      done(); 
    });
  });

  it('should not be able to decode with an invalid key', function(done) {
    eat.decode(token, 'wrongpassword', function(err, decoded) {
      expect(err).to.not.eql(null);
      expect(decoded).to.eql(undefined);
      expect(err.message).to.eql('could not decode token');
      done();
    });
  });
});
