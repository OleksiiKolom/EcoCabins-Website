import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp'; // Відправляє файли на сервер
import util from 'gulp-util'; // Відображення копіювання файлів на FTP-сервер

// Завдання для відправки файлів на сервер
export const ftp = () => {

    // Вивести стан копіювання
    configFTP.log = util.log;

    // Створити підключення до сервера
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		
        // Обробка і виведення помилок в консоль
        .pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			}))
		)

        // Відправити файли на сервер
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}