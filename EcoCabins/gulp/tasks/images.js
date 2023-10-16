import webp from "gulp-webp"; // Конвертування всіх растрових зображень у формат WebP
import imagemin from "gulp-imagemin"; // Оптимізація (стиснення) зображень

// Завдання для обробки зображень
export const images = () => {
	return app.gulp.src(app.path.src.images)

		// Обробка і виведення помилок в консоль
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)

		// Фільтр: обрати лише нові або змінені зображення
        .pipe(app.plugins.newer(app.path.build.images))

		// Якщо режим збірки, то створити зображення у форматі WebP
		.pipe(
			app.plugins.if(
				app.isBuild,
				webp()
			)
		)

		// Якщо режим збірки, зберігти зображення WebP
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.dest(app.path.build.images)
			)
		)

		// Якщо режим збірки, завантажити початкові зображення знову
        .pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.src(app.path.src.images)
			)
		)

		// Якщо режим збірки, фільтр: обрати лише нові або змінені файли
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.plugins.newer(app.path.build.images)
			)
		)

		// Якщо режим збірки, то оптимізувати зображення
        .pipe(
			app.plugins.if(
				app.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)

		// Зберігти зображення
        .pipe(app.gulp.dest(app.path.build.images))

		// Завантажити зображення SVG
        .pipe(app.gulp.src(app.path.src.svg))

		// Зберігти зображення SVG
        .pipe(app.gulp.dest(app.path.build.images))

		// Оновити браузер
		.pipe(app.plugins.browsersync.stream());
}