'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  var files = ['lib/**/*.js', 'test/**/*test.js', 'Gruntfile.js'];

  grunt.initConfig({
    jshint: {
      options: {
        node: true 
      },
      src: files
    },

    simplemocha: {
      src: ['test/**/*test.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['test']);
};
