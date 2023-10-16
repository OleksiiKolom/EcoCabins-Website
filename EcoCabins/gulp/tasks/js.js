import webpack from 'webpack-stream';

// Завдання для обробки JS-файлів
export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })

    // Обробка і виведення помилок в консоль
    .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))

        // Зібрати JavaScript за допомогою Webpack
        .pipe(webpack({
            mode: app.isBuild ? "production" : "development",
            output: {
                filename: "app.min.js"
            }
        }))

        // Зберігти JS-файли
        .pipe(app.gulp.dest(app.path.build.js))

        // Оновити браузер
        .pipe(app.plugins.browsersync.stream());
}