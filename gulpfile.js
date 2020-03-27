const
    gulp = require('gulp'),
    cssimport = require("gulp-cssimport"),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer')

var AUTOPREFIXER = [
    '> 1%',
    'ie >= 8',
    'edge >= 15',
    'ie_mob >= 10',
    'ff >= 45',
    'chrome >= 45',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
]


gulp.task('build:css', () => {
    return gulp.src(['development/css/index.css'])
        .pipe(cssimport({ matchPattern: "*.css" }))
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER,
            cascade: false
        }))
        .pipe(gulp.dest('production/css'))
})

gulp.task('build:js', () => {
    return gulp.src('development/js/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(gulp.dest('production/js'))
})

gulp.task('default', gulp.series('build:css', 'build:js'))