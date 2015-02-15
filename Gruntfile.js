module.exports = function(grunt) {
  var _ = grunt.util._;

  var sourceFiles = [ '*.js', 'lib/**/*.js', 'core/**/*.js', 'travis/**/*.js' ];
  var testFiles = [ 'test/**/*.js' ];
  var allFiles = sourceFiles.concat(testFiles);

  grunt.initConfig({
    jscs : {
      src: allFiles
    , options: {
        config: '.jscsrc'
      }
    }

  , jshint: {
      files: ['Gruntfile.js', '*.js', 'test/*.js', 'lib/*.js']
    , options: {
        laxcomma: true
      }
    }

  , mochaIstanbul: {
      coverage: {
        src: 'test'
      }
    }

  , coveralls: {
      options: {
        src: 'coverage/lcov.info'
      , force: false
      }
    }
  });

  grunt.event.on('test', function(lcov, done) {
    require('coveralls').handleInput(lcov, function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-coveralls');

  // Rename tasks
  grunt.task.renameTask('mocha_istanbul', 'mochaIstanbul');

  // Register tasks
  grunt.registerTask('test', [ 'mochaIstanbul:coverage', 'coveralls' ]);
  grunt.registerTask('lint', 'Check for common code problems.', [ 'jshint' ]);
  grunt.registerTask('style', 'Check for style conformity.', [ 'jscs' ]);
  grunt.registerTask('default', [ 'lint', 'style', 'test' ]);

};
