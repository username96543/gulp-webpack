import svgSprite from "gulp-svg-sprite";

export const svg = () => {
  return (
    app.gulp
      .src(`${app.path.src.svg}`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        svgSprite({
          mode: {
            // stack: {
            //   sprite: `../sprite.svg`,
            //   // Создавать страницу с перечнем иконок
            //   example: true,
            // },
            // view: {
            //   // Activate the «view» mode
            //   bust: false,
            //   render: {
            //     scss: true, // Activate Sass output (with default options)
            //   },
            // },
            symbol: {
              sprite: `../sprite.svg`,
              // Создавать страницу с перечнем иконок
              example: true,
            }, // Activate the «symbol» mode
          },
        })
      )
      // Отправить symbol-sprite в src, чтобы подключить в body для сокращения ресурсов
      .pipe(app.gulp.dest(`${app.path.srcFolder}/html/components/sprite/`))
    // По умолчанию - отправить спрайт в build
    //.pipe(app.gulp.dest(`${app.path.build.svg}`))
    //.pipe(app.plugins.browsersync.stream())
  );
};
