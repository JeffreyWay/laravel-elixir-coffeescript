var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var config = Elixir.config;
var coffee;

/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

var gulpTask = function (paths, options) {
    this.recordStep('Compiling CoffeeScript');

    return (
        gulp
        .src(paths.src.path)
        .pipe(this.initSourceMaps())
        .pipe(coffee(options || config.js.coffee.options))
        .on('error', this.onError())
        .pipe(this.concat())
        .pipe(this.minify())
        .pipe(this.writeSourceMaps())
        .pipe(this.saveAs(gulp))
        .pipe(new Elixir.Notification('CoffeeScript Compiled!'))
    );
};


Elixir.extend('coffee', function(src, output, options) {
    var paths;

    coffee = require('gulp-coffee');

    config.js.coffee = {
        'folder': 'coffee',
        // https://github.com/wearefractal/gulp-coffee#options
        options: {}
    };

    new Elixir.Task('coffee', function() {
        return gulpTask.call(this, paths, options);
    }, paths = prepGulpPaths(src, output))
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {Elixir.GulpPaths}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.js.coffee.folder'))
        .output(output || config.get('public.js.outputFolder'), 'app.js');
};
