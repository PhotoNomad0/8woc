// Load modules which are installed through NPM.
var gulp = require('gulp'),
	browserify = require('browserify'),  // Bundles JS.
	del = require('del'),  // Deletes files.
	// reactify = require('reactify'),  // Transforms React JSX to JS.
	babelify = require('babelify'),
	bablePresetReact = require('babel-preset-react'),
	source = require('vinyl-source-stream');

// Define paths
var paths = {
  index_js: ['./src/js/index.js'],
  js: ['src/js/*.js', 'src/js/vendor/*.js'],
};

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'js']);

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});


// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
// gulp.task('clean', function() {
//   del.sync(['dist']);
// });

// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
  // Browserify/bundle the JS.
  browserify(paths.index_js)
    .transform('babelify', {presets: ['react']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js/'));
});

