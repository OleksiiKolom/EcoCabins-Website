// Завдання для запуску локального сервера
export const server = (done) => {
    app.plugins.browsersync.init({

        // Налаштування сервера
        server: {
            baseDir: `${app.path.build.html}`
        },

        // Вимкнення сповіщень
        notify: false,

        // Порт сервера
        port: 3000
    });
}