(function(undefined) {
  
  'use strict';

  /**
   * Requires gulp
   */
  var gulp = require('gulp');


  /**
   * Requires gulp dependencies
   */
  var concat     = require('gulp-concat');
  var connect    = require('gulp-connect');
  var jade       = require('gulp-jade');
  var livereload = require('gulp-livereload');
  var plumber    = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var stylus     = require('gulp-stylus');
  var uglify     = require('gulp-uglify');

  /** Stylus dependencies */
  var jeet    = require('jeet');
  var kouto   = require('kouto-swiss');
  var rupture = require('rupture');


  /**
   * Define paths, sources and destinations
   */
   var stylusSrc   = ['front/stylesheets/styles.styl'];
   var stylusFiles = ['front/stylesheets/**/*.styl'];
   var stylusDest  = 'public/assets/stylesheets';

   var scriptsSrc   = ['front/javascripts/**/*.js'];
   var scriptsFiles = scriptsSrc;
   var scriptsDest  = 'public/assets/javascripts';

   var jadeSrc   = ['front/**/*.jade'];
   var jadeFiles = jadeSrc;
   var jadeDest  = 'public';


  /**
   * Server task
   *
   * Creates a static server using connect with livereload support
   */
  gulp.task('server', function() {
    connect.server({
      port: 3000,
      root: 'public',
      livereload: true
    });
  });


  /**
   * Jade task
   *
   * Concats javascripts files and minifies them
   */
  gulp.task('jade', function() {
    gulp.src(jadeSrc)
      .pipe(plumber())
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest(jadeDest))
      .pipe(livereload());
  });


  /**
   * Scripts task
   *
   * Concats javascripts files and minifies them
   */
  gulp.task('scripts', function() {
    gulp.src(scriptsSrc)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(scriptsDest))
      .pipe(livereload());
  });


  /**
   * Stylus task
   *
   * Compiles stylus files into css files and creates sourcemaps
   */
  gulp.task('stylus', function() {
    var stylusOptions = {
      compress: true,
      use: [jeet(), kouto(), rupture()]
    };

    gulp.src(stylusSrc)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(stylus(stylusOptions))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(stylusDest))
      .pipe(livereload());
  });


  /**
   * Watch task
   *
   * Watches for changes and perform gulp tasks accordingly
   */
  gulp.task('watch', ['jade', 'server', 'scripts', 'stylus'], function() {
    livereload.listen();

    gulp.watch(stylusFiles, ['stylus']);
    gulp.watch(scriptsFiles, ['scripts']);
    gulp.watch(jadeFiles, ['jade']);
  });

})();
