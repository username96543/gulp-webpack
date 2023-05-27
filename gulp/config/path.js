import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/assets/css/`,
    js: `${buildFolder}/assets/js/`,
    img: `${buildFolder}/assets/img/`,
    svg: `${buildFolder}/assets/img/svg/`,
    fonts: `${buildFolder}/assets/fonts/`,
    files: `${buildFolder}/assets/files/`,
  },
  src: {
    html: [`${srcFolder}/html/*.html`, "!" + `${srcFolder}/html/_*.html`],
    //html: [`${srcFolder}/wordpress/**/*.*`, "!" + `${srcFolder}/wordpress/**/_*.*`],
    sass: `${srcFolder}/sass/main.scss`,
    //sass: [`${srcFolder}/sass/common.sass`, `${srcFolder}/sass/vendors.sass`],
    //js: `${srcFolder}/js/main.js`,
    js: [`${srcFolder}/js/common.js`, `${srcFolder}/js/vendors.js`],
    img: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
      "!" + `${srcFolder}/img/**/*.svg`,
    ],
    svg: `${srcFolder}/img/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    files: `${srcFolder}/files/**/*.*`,
    //svgicons: `${srcFolder}/svgicons/**/*.svg`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.*`,
    //html: `${srcFolder}/wordpress/**/*.*`,
    sass: `${srcFolder}/sass/**/*.*`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
