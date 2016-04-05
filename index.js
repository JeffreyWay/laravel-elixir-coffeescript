var gulp = require('gulp');
var coffee = require('gulp-coffee');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

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
    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe(coffee(options || config.js.coffee.options)
            .on('error', function(e) {
                new Elixir.Notification().error(
                    e, 'CoffeeScript Compilation Failed!'
                );

                this.emit('end');
            }))
        .pipe($.concat(paths.output.name))
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Elixir.Notification('CoffeeScript Compiled!'))
    );
};

Elixir.extend('coffee', function(src, output, options) {
    var paths;

    config.js.coffee = {
        'folder': 'coffee',
        // https://github.com/wearefractal/gulp-coffee#options
        options: {}
    };

    paths = prepGulpPaths(src, output);

    new Elixir.Task('coffee', function() {
        this.log(paths.src, paths.output);

        return gulpTask(paths, options);
    })
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