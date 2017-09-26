const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const sassFiles = './src/scss/**/*.scss';
const jsFiles = './src/js/**/*.js';

const bsOptions = {
  server: './'
};

const sassOptions = {
  outputStyle: 'compressed'
};

gulp.task('scripts', () => {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync.init(bsOptions);
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch(sassFiles, ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);