(function(undefined) {
  
  'use strict';

  /**
   * Requires gulp
   */
  var gulp = require('gulp');


  /**
   * Requires gulp dependencies
   */
  var clean      = require('gulp-clean');
  var concat     = require('gulp-concat');
  var connect    = require('gulp-connect');
  var jade       = require('gulp-jade');
  var jshint     = require('gulp-jshint');
  var livereload = require('gulp-livereload');
  var plumber    = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var stylus     = require('gulp-stylus');
  var uglify     = require('gulp-uglify');
  var watch      = require('gulp-watch');

  /** Stylus dependencies */
  var jeet    = require('jeet');
  var kouto   = require('kouto-swiss');
  var rupture = require('rupture');

  /** Jshint dependencies */
  var stylish = require('jshint-stylish');


  /**
   * Define paths, sources and destinations
   */
  var stylusSrc   = ['front/stylesheets/paper.styl'];
  var stylusFiles = ['front/stylesheets/**/*.styl'];
  var stylusDest  = 'public/assets/stylesheets';

  var scriptsSrc   = ['front/javascripts/**/*.js'];
  var scriptsFiles = scriptsSrc;
  var scriptsDest  = 'public/assets/javascripts';

  var jadeSrc   = ['front/*.jade'];
  var jadeFiles = jadeSrc;
  var jadeDest  = 'public';

  var templatesSrc = ['front/javascripts/components/**/*.jade'];
  var templatesFiles = templatesSrc;
  var templatesDest = 'public/templates';


  /**
   * Clean task
   *
   * Cleans the build directory
   */
  gulp.task('clean', function() {
    gulp.src('public', {read: false})
      .pipe(clean());
  });


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
   * Compiles jade files into html
   */
  gulp.task('jade', function() {
    gulp.src(jadeSrc)
      .pipe(plumber())
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest(jadeDest))
      .pipe(livereload());
  });


  /**
   * Templates task
   *
   * Compiles angular templates
   */
  gulp.task('templates', function() {
    gulp.src(templatesSrc)
      .pipe(plumber())
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest(templatesDest))
      .pipe(livereload());
  });

  /**
   * Jade task
   *
   * Concats javascripts files and minifies them
   */
  gulp.task('jshint', function() {
    gulp.src(scriptsFiles)
      .pipe(plumber())
      .pipe(watch(scriptsFiles))
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
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
      .pipe(concat('paper.js'))
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
  gulp.task('watch', ['jade', 'server', 'scripts', 'stylus', 'templates'], function() {
    livereload.listen();

    gulp.watch(stylusFiles, ['stylus']);
    gulp.watch(scriptsFiles, ['scripts']);
    gulp.watch(jadeFiles, ['jade']);
    gulp.watch(templatesFiles, ['templates']);
  });

})();
