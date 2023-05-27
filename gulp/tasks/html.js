import fileInclude from "gulp-file-include";
//import webpHTML from "gulp-webp-html-nosvg";
//import webpHTML from 'gulp-webp-html';
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug";

export const html = (file) => {
  let path = app.path.src.html;
  if (typeof file !== "function") {
    path = `./${file}`;

    let file1 = {};
    file1.path = path;
    file1.arr = path.split("/");
    file1.name = file1.arr[file1.arr.length - 1];

    path = `./src/wordpress/**/${file1.name}`;
  }

  return (
    app.gulp
      .src(path)
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
      .pipe(
        app.plugins.replace(
          /@css\//g,
          "<?php echo get_template_directory_uri(); ?>/assets/css/"
        )
      )
      .pipe(
        app.plugins.replace(
          /@js\//g,
          "<?php echo get_template_directory_uri(); ?>/assets/js/"
        )
      )
      .pipe(
        app.plugins.replace(
          /@img\//g,
          "<?php echo get_template_directory_uri(); ?>/assets/img/"
        )
      )
      //.pipe(webpHTML())
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
