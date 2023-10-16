import fileInclude from 'gulp-file-include'; // Підключення файлів за директивою include
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; // Додавання HTML-коду підключення WebP зображень
import versionNumber from 'gulp-version-number'; // Додавання версії в version.json для посилань на CSS і JS

// Завдання для обробки HTML-файлів
export const html = () => {
    return app.gulp.src(app.path.src.html)

        // Обробка і виведення помилок в консоль
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )

        // Підключення окремих HTML-файлів за директивою include
        .pipe(fileInclude())

        // Заміна/корегування шляхів зображень
        .pipe(app.plugins.replace(/@img\//g, "img/"))

        // Якщо режим збірки, то додати HTML-код підключення WebP зображень
        .pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)

        // Якщо режим збірки, то додати версії до посилань на CSS і JS, запис версії в version.json
        .pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
			)
		)

        // Зберегти HTML-файли
        .pipe(app.gulp.dest(app.path.build.html))

        // Оновити браузер
        .pipe(app.plugins.browsersync.stream());
}