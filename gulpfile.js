//TODO PLUGINS
const gulp = require('gulp') //
const include = require('gulp-file-include') //
const sass = require('gulp-sass')(require('sass')) //
const prefix = require('gulp-autoprefixer') //
const server = require('gulp-server-livereload') //
const clean = require('gulp-clean') //
const fs = require('fs') //
const maps = require('gulp-sourcemaps') //
const media = require('gulp-group-css-media-queries') //
const plumber = require('gulp-plumber') //
const notify = require('gulp-notify') //
const webpack = require('webpack-stream') //
const imgMin = require('gulp-imagemin') //
const changed = require('gulp-changed') //
const sassGlob = require('gulp-sass-glob') //
const csso = require('gulp-csso') //


//
const plumbernotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message:"Error: <%= error.message %>",
            sound: "false"
        })
    }
}


//! TASKS
gulp.task('fileInclude', (e) =>{
    return gulp.src(['./app/html/*.html', '!./app/html/components/*.html'])
    .pipe(plumber(plumbernotify('HTML')))
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', (e) =>{
    return gulp.src('./app/scss/*.scss')
    .pipe(plumber(plumbernotify('SCSS')))
    .pipe(maps.init())
    .pipe(prefix())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(media())
    .pipe(csso()) //* MIN
    .pipe(maps.write())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('js', (e) => {
    return gulp.src('./app/js/*.js')
    .pipe(plumber(plumbernotify('JS')))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('copyImg', (e) =>{
    return gulp.src('./app/img/dist/*')
    .pipe(changed('./dist/img'))
    .pipe(imgMin({ verbose: true }))
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('fonts', (e) =>{
    return gulp.src('./app/fonts/dist/*.*')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('libs', (e) =>{
    return gulp.src('./app/libs/components/*.*')
    .pipe(gulp.dest('./dist/libs'))
})

gulp.task('startServer', (e) =>{
    return gulp.src('./dist')
    .pipe(server({
        livereload: true,
        open: true,
    }))
})

gulp.task('cleanDist', (e) =>{
    if(fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false })
        .pipe(clean({ force: true }))
    }
    e()
})

gulp.task('watch', (e) =>{
    gulp.watch('./app/scss/*.scss', gulp.parallel('sass'))
    gulp.watch('./app/**/*.html', gulp.parallel('fileInclude'))
    gulp.watch('./app/img/**/*', gulp.parallel('copyImg'))
    gulp.watch('./app/fonts/**/*', gulp.parallel('fonts'))
    gulp.watch('./app/js/*.js', gulp.parallel('js'))
    gulp.watch('./app/libs/*', gulp.parallel('libs'))
})

gulp.task('default', 
    gulp.series('cleanDist',
     gulp.parallel('fileInclude', 'sass', 'copyImg', 'fonts', 'js', 'libs'),
      gulp.parallel('startServer', 'watch')
))
     
