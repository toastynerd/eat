'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  var files = ['lib/**/*.js', 'test/**/*test.js', 'Gruntfile.js'];

  grunt.initConfig({
    jshint: {
      options: {
        node: true,
        globals: {
          describe: false,
          it: false,
          before: false
        }
      },
      src: files
    }
  });

  grunt.registerTask('default', ['jshint']);
};
