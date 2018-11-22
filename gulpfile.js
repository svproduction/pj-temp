// Подключение пакетов

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var scss = require("gulp-sass");
var pug = require("gulp-pug");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");

// Gulp задачи

gulp.task("server", ["pug", "scss"], function() {
  browserSync.init({
    server: { baseDir: "./dist/" }
  });

  gulp.watch("src/pug/**/*.*", ["pug"]);
  // gulp.watch("src/**/*.html"), ['markup'];
  gulp.watch("src/scss/**/*.scss", ["scss"]);
  // gulp.watch("src/js//**/*.js", ["copy:js"]);
  // gulp.watch("src/img/**/*.*", ["copy:img"]);
});

gulp.task("scss", function() {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function(err) {
          return {
            title: "Styles",
            message: err.message
          };
        })
      })
    )
    .pipe(scss())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("pug", function() {
  return gulp
    .src("./src/pug/index.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(function(err) {
          return {
            title: "Pug",
            message: err.message
          };
        })
      })
    )
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["server"]);
