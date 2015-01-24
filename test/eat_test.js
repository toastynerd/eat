'use strict';

var expect = require('chai').expect;
var eat = require('../index.js');

describe('csrft object', function() {
  it('should be able an object', function() {
    expect(typeof(eat) === 'object');
  });

  it('should be able to generate salt async', function(done) {
    eat.genSalt(function() {
      expect(typeof(eat.salt)).to.eql('object');
      done(); 
    });
  });
});
