// Завдання для копіювання файлів
export const copy = () => {
    return app.gulp.src(app.path.src.files)

        // Копіювати папку files у вихідну папку
        .pipe(app.gulp.dest(app.path.build.files))
}