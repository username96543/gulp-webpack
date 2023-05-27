import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Ищем файлы шрифтов .oft
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const woffDest = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.woff2`, {})
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsBase64 = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/sass/fonts.scss`;
  // Проверяем существуют ли файлы шрифтов

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (err) {
        console.log(err);
      } else {
        // Проверяем существует ли файл стилей для подключения шрифтов
        if (!fs.existsSync(fontsFile)) {
          // Если файла нет, создаем его
          fs.writeFile(fontsFile, "", cb);
          let newFileOnly;
          for (let i = 0; i < fontsFiles.length; i++) {
            let fontBase64 = fs.readFileSync(
              app.path.build.fonts + fontsFiles[i],
              {
                encoding: "base64",
              }
            );
            // Записываем подключения шрифтов в файл стилей
            let fontFileName = fontsFiles[i].split(".")[0];
            if (newFileOnly !== fontFileName) {
              let fontName = fontFileName.split("-")[0]
                ? fontFileName.split("-")[0]
                : fontFileName;
              let fontWeight = fontFileName.split("-")[1]
                ? fontFileName.split("-")[1]
                : fontFileName;
              if (fontWeight.toLowerCase() === "thin") {
                fontWeight = 100;
              } else if (fontWeight.toLowerCase() === "extralight") {
                fontWeight = 200;
              } else if (fontWeight.toLowerCase() === "light") {
                fontWeight = 300;
              } else if (fontWeight.toLowerCase() === "medium") {
                fontWeight = 500;
              } else if (fontWeight.toLowerCase() === "semibold") {
                fontWeight = 600;
              } else if (fontWeight.toLowerCase() === "bold") {
                fontWeight = 700;
              } else if (
                fontWeight.toLowerCase() === "extrabold" ||
                fontWeight.toLowerCase() === "heavy"
              ) {
                fontWeight = 800;
              } else if (fontWeight.toLowerCase() === "black") {
                fontWeight = 900;
              } else {
                fontWeight = 400;
              }
              fs.appendFile(
                //src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                fontsFile,
                `@font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url(data:application/x-font-woff;charset=utf-8;base64,${fontBase64}) format("woff2");
                font-weight: ${fontWeight};
                font-style: normal;
              }\r\n`,
                cb
              );
              // `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;}
              newFileOnly = fontFileName;
            }
          }
        } else {
          // Если файл есть, то выводим сообщение
          console.log(
            "Файл scss/fonts.scss уже существует. Для обновления нужно его удалить.",
            "Это нужно для того, чтобы можно было дописывать свои изменения в файл."
          );
        }
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
