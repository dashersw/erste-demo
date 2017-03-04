var changed = require('gulp-changed');
var concat = require('gulp-concat');
var del = require('del');
var filenames = require('gulp-filenames');
var fs = require('fs');
var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');
// var rev = require('gulp-rev');
// var revNapkin = require('gulp-rev-napkin');
// var revReplace = require('gulp-rev-replace');
var runSequence = require('run-sequence');
var serverLivereload = require('gulp-server-livereload');
var urlAdjuster = require('gulp-css-url-adjuster');

var templates = require('./tasks/templates');
var compileJs = require('./tasks/compilejs');

var APP_ENV = process.env.APP_ENV || 'local';
var APP_PLATFORM = process.env.APP_PLATFORM || 'web';

gulp.task('default', function(callback) {
    runSequence('clean:before',
        ['compile-dev', 'lib-dev', 'css-dev'],
        ['static'],
        ['process-html-dev'],
        'clean:after',
        ['watch-css', 'serve'],
        callback);
});

gulp.task('watch-css', function() {
    return templates.watchStyles();
});

gulp.task('compile-dev', function(cb) {
    compileJs({watch: true}, cb);
});

gulp.task('lib-dev', function() {
    var bowerMain = require('bower-main'),
        bowerMainJavaScriptFiles = bowerMain('js', 'min.js', '');

    return gulp.src(bowerMainJavaScriptFiles.normal).
        pipe(concat('lib.js')).
        pipe(gulp.dest('www'));
});

gulp.task('css-dev', function() {
    return gulp.src(['src/**/*.css']).
        pipe(changed('www')).
        pipe(urlAdjuster({ prepend: '/' })).
        pipe(gulp.dest('www'));
});

// gulp.task('revision', function() {
//     return gulp.src(['www/index.js', 'www/style.css']).
//         pipe(rev()).
//         pipe(gulp.dest('www')).
//         pipe(revNapkin()).
//         pipe(rev.manifest()).
//         pipe(gulp.dest(''));
// });

gulp.task('get-css', function() {
    return gulp.src(['src/**/reset.css', 'src/**/base.css', 'src/**/*.css']).
        pipe(filenames('css'));
});

gulp.task('static', function() {
    return gulp.src('src/static/**/*.*')
        .pipe(gulp.dest('www/static'));
});

gulp.task('process-html-dev', ['get-css'], function() {
    // var manifest = gulp.src('./rev-manifest.json');
    var css = filenames.get('css').map(f => f);

    var version = require('./package.json').version;
    var environment = fs.readFileSync(`./config/${APP_ENV}.js`).toString();
    var platform = fs.readFileSync(`./config/${APP_PLATFORM}.js`).toString();

    var config = `
<script>
    cfg = {};
    cfg.VERSION = '${version}';
    ${environment}
    ${platform}
</script>`;
    return gulp.src('src/index.html').
        pipe(htmlReplace({
            styles: css,
            scripts: ['cordova.js', 'lib.js', 'index.js'],
            config: config
        })).
        pipe(gulp.dest('www')).
        // pipe(revReplace({manifest: manifest})).
        pipe(htmlmin({collapseWhitespace: false})).
        pipe(gulp.dest('www'));
});

gulp.task('clean:before', function() {
    del('www/*');
});

gulp.task('clean:after', function() {
    del('rev-manifest.json');
});

gulp.task('serve', function() {
    return gulp.src('www').pipe(serverLivereload({
        port: 42000,
        fallback: 'index.html',
        livereload: {
            enable: true,
            filter: function(filePath, cb) {
                cb(/www\/update|css$|js$/.test(filePath));
            }
        }
        // open: true
    }));
});
