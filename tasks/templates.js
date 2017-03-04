var angularTemplatecache = require('gulp-angular-templatecache');
var changed = require('gulp-changed');
var del = require('del');
var filter = require('gulp-filter');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var templates = require('./templates');
var touch = require('touch');
var vinylPaths = require('vinyl-paths');
var watch = require('gulp-watch');

module.exports = {
    watchStyles: watchStyles
};


function watchStyles() {
    var deletedOnly = fileEvents('unlink'),
        addedChangedOnly = fileEvents('add', 'change');

    return watch(['src/**/*.css']).
        pipe(deletedOnly).
        pipe(rename(function(file) {
            file.dirname = '../../www/' + file.dirname;
            return file;
        })).
        pipe(vinylPaths(del)).
        pipe(deletedOnly.restore).
        pipe(addedChangedOnly).
        pipe(gulp.dest('www')).
        pipe(addedChangedOnly.restore);
}

function fileEvents() {
    var passEvents = [...arguments];

    return filter(function(file) {
        return passEvents.indexOf(file.event) > -1;
    }, {restore: true});
}
