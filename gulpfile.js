const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.server.json');
gulp.task('scripts', () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./server'));
});
//set up a watcher to watch over changes
gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['scripts']);