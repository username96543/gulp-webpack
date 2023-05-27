

export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`
    },
    notify: false,
    port: 3000,
  });
}

// Для wordpress (apache server)
/*
export const server = (done) => {
  app.plugins.browsersync.init({
    open: "external",
    host: "wp1.local",
    proxy: "wp1.local",
    notify: false,
  });
};
*/
