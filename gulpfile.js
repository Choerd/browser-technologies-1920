const
  gulp = require('gulp'),
  cssimport = require('gulp-cssimport'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat')

gulp.task('build:css', () => {
  return gulp
    .src(['development/css/index.css'])
    .pipe(cssimport({ matchPattern: '*.css' }))
    .pipe(gulp.dest('production/css'))
})

gulp.task('build:js', () => {
  return gulp
    .src('development/js/*.js')
    .pipe(concat('index.js'))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('production/js'))
})

gulp.task('default', gulp.series('build:css', 'build:js'))
