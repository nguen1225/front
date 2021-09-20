var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
    // sourcemaps = require('gulp-sourcemaps');
    

const dir = {
    dist: "dist",
    src:  "resources"
}

gulp.task('scripts', function() {
    return gulp.src([
        dir.src + 'js/helpers/*.js',
        dir.src + '/js/*.js',
      ])
    //   .pipe(concat('custom.js'))
      .pipe(gulp.dest(dir.dist+'/js'))
    //   .pipe(rename({suffix: '.min'}))
    //   .pipe(uglify())
      .pipe(gulp.dest(dir.dist+'/js'))
      .pipe(browserSync.stream());
});

gulp.task('production_scripts', function() {
    return gulp.src([
        dir.src + 'js/helpers/*.js',
        dir.src + '/js/*.js',
      ])
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(dir.dist+'/js'))
      .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function (filename, options) {
	return gulp.src(dir.src + '/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        // .pipe(sourcemaps.init())
        // .pipe(concat(filename))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dir.dist + '/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass', function (cb) {
	compileSASS('custom.css', {});
	cb();
});

gulp.task('sass-minify', function() {
    return compileSASS('custom.min.css', {style: 'compressed'});
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(dir.src + '/js/*.js', gulp.series('scripts'));
  // Watch .scss files
  gulp.watch(dir.src + '/scss/*.scss', gulp.series('sass', 'sass-minify'));
});

// Default Task
gulp.task('default', gulp.series(
    'scripts',
    'sass',
    'sass-minify', 
    'watch'
));

gulp.task('production', gulp.series(
    'production_scripts',
    'sass-minify'
));