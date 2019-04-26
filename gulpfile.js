const gulp = require('gulp')

gulp.plugins = require('gulp-load-plugins')()

function scripts() {
  return gulp.src("./index.js")
    .pipe(gulp.plugins.terser())
    .pipe(gulp.plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest("./"))
}

function styles() {
  return gulp.src("./index.styl")
    .pipe(gulp.plugins.stylus({
      include: 'styles',
    }))
    .pipe(gulp.plugins.postcss())
    .pipe(gulp.plugins.cleanCss())
    .pipe(gulp.plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest("./"))
}

function webp() {
  return gulp.src('media/images/**/*')
    .pipe(gulp.plugins.webp())
    .pipe(gulp.dest('build/media/images'))
}

function fallbackImages() {
  return gulp.src('media/images/**/*')
    .pipe(gulp.plugins.imagemin())
    .pipe(gulp.dest('build/media/images'))
}

const images = gulp.parallel(webp, fallbackImages)

exports.watch = function () {
  gulp.watch('media/images/**/*', images)
  gulp.watch('./scripts/**/*.js', scripts)
  gulp.watch('./styles/**/*.styl', styles)
}

exports.default = gulp.parallel(images, scripts, styles)
