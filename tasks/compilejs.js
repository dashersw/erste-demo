var babel = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

module.exports = function compileJs(options, cb) {
    options = options || {};

    var bundler = browserify('src/index.js', { debug: true, paths: ['src/'] }).transform(babel);
    var activeBundleOperationCount = 0;

    if (options.watch = true) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle);
    }

    function rebundle(cb) {
        activeBundleOperationCount++;
        bundler
            .bundle()
            .on('error', function(err) {
                console.error(err);
                this.emit('end');
            })
            .on('end', function() {
                activeBundleOperationCount--;
                if (activeBundleOperationCount == 0) {
                    console.info('All current JS updates done.');
                    typeof cb == 'function' && cb();
                }
            })
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(rename('index.js'))
            .pipe(gulp.dest('www'));
    }

    rebundle(cb);
}
