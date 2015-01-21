'use strict';

var expect = require('chai').expect;
var csrft = require('../index.js');

describe('csrft object', function() {
  it('should be able an object', function() {
    expect(typeof(csrft) === 'object');
  });

  it('should be able to generate salt async', function(done) {
    csrft.genSalt(function() {
      expect(typeof(csrft.salt)).to.eql('object');
      done(); 
    });
  });
});
