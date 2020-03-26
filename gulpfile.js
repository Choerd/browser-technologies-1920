const
    gulp = require('gulp'),
    cssimport = require("gulp-cssimport"),
    babel = require('gulp-babel')


gulp.task('css', () => {
    return gulp.src(['development/css/index.css'])
        .pipe(cssimport({ matchPattern: "*.css" }))
        .pipe(gulp.dest('production/css'))
})

gulp.task('js', () =>
    gulp.src('development/js/index.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(gulp.dest('production/js'))
)

gulp.task('default', gulp.series('css', 'js'))