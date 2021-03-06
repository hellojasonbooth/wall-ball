
var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")
var autoprefixer = require('gulp-autoprefixer')
var imagemin = require('gulp-imagemin')

var browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

gulp.task("sass", function() {
    //we want to run "sass css/app.scss app.css --watch"
    return gulp.src("src/css/app.scss")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sass())
    .pipe(
        cleanCss({
            compatibility: 'ie8'
        })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())

})

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
    return gulp.src("src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
})

gulp.task("scripts", function () {
    return gulp.src("src/scripts/*.js")
        .pipe(gulp.dest("dist/scripts"))
})




gulp.task("watch", function(){

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })


    gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
    gulp.watch("src/css/app.scss", ["sass"])
    gulp.watch("src/fonts/*", ["fonts"])
    gulp.watch("src/img/*", ["images"])
    gulp.watch("src/scripts/*.js", ["scripts"])
})

gulp.task('default', ["html", "sass", "fonts", "images", "scripts", "watch"])

