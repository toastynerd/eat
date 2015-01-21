'use strict';

var expect = require('chai').expect;
var csrft = require('../index');

describe('encode and decode', function() {
  var token;
  before(function(done) {
    csrft.encode({hello: 'world'}, 'testpassword', function(encrypted) {
      token = encrypted;
      done();
    });
  });

  it('should be able to decode with the same key', function(done) {
    csrft.decode(token, 'testpassword', function(decoded) {
      expect(decoded.hello).to.eql('world');
      done(); 
    });
  });
});
