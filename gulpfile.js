// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { copy } from "./gulp/tasks/copy.js";
import { server } from "./gulp/tasks/server.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import { svg } from "./gulp/tasks/svg.js";
import {
  otfToTtf,
  ttfToWoff,
  woffDest,
  fontsBase64,
} from "./gulp/tasks/fonts.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  //gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.html).on("change", html); // Для SFTP загрузки отред. файла
  gulp.watch(path.watch.sass, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.svg, svg, html);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, woffDest, fontsBase64);

// Основные задачи
const mainTasks = gulp.series(
  fonts, // Надо удалять файл font.scss, если не обновляет
  gulp.parallel(copy, scss, js, img),
  gulp.series(svg, html)
);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task("default", dev);
