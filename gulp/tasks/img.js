import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import sharpResponsive from "gulp-sharp-responsive";

export const img = () => {
  return app.gulp.src(app.path.src.img)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.img))
    .pipe(app.plugins.newer(app.path.build.img))
    // Разобраться куда разместить и добавить как в wordpress.
    // https://www.npmjs.com/package/gulp-sharp-responsive
    .pipe(sharpResponsive({
      formats: [
        { width: 640, rename: { suffix: "-sm" } },
        { width: 1024, rename: { suffix: "-lg" } },
      ]
    }))
    .pipe(imagemin({
      progressive: true,
      svgPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(app.plugins.browsersync.stream())
}

