import fileInclude from "gulp-file-include";
import webpHTML from "gulp-webp-html-nosvg";
//import webpHTML from 'gulp-webp-html';
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(fileInclude()) // HTML
      // .pipe(pug({ // Pug
      //   // Сжатие HTML файла
      //   pretty: true,
      //   // Показывать в терминале какой файл обработан
      //   verbose: true
      // }))
      .pipe(app.plugins.replace(/@css\//g, "./assets/css/"))
      .pipe(app.plugins.replace(/@js\//g, "./assets/js/"))
      .pipe(app.plugins.replace(/@img\//g, "./assets/img/"))
      .pipe(webpHTML())
      .pipe(
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
