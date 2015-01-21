'use strict';

var expect = require('chai').expect;
var csrft = require('../index');

describe('encode a token', function() {
  before(function(done) {
    //this is actually done on iniation but we're doing it a second time
    csrft.genSalt(function(){
      done();
    });
  });

  it('encode should return a string', function(done) {
    csrft.encode({hello: "world"}, 'sometestsecret', function(token) {
      expect(typeof(token)).to.eql('string');
      done();
    });
  });
});
