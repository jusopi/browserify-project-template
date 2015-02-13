/**
 * Created by jopitz on 6/25/2014.
 */

"use strict";

//////////////////////////////
//  DEV
//////////////////////////////

var browserify = require( 'browserify' );
var gulp = require( 'gulp' );
var connect = require( 'gulp-connect' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var rename = require( 'gulp-rename' );

function bundle( src, name, dest )
{
	return browserify( { entries: [ src ], debug: true } )
		// .transform( to5ify )
		.bundle()
		.pipe( source( name ) )
		.pipe( buffer() )
		.pipe( gulp.dest( dest ) )
}

// Basic usage
gulp.task( 'compile', function() { bundle( './src/main.js', 'bundle.js', './src' ) } );

gulp.task( 'connect', function()
{
	return connect.server( {
		root:       './src',
		livereload: true
	} );
} );

gulp.task( 'reload', function()
{
	return gulp.src( './src/*.html' )
		.pipe( connect.reload() );

} );


gulp.task( 'watch', function()
{
	gulp.watch( [
			"./src/**/*.*", //watch these
			"!./src/bundle.js", "!./src/bundle.css" //but ignore these
		],
		[ 'compile' ] );
	gulp.watch( [ './src/bundle.js' ], [ 'reload' ] );
} );

gulp.task( 'default', [ 'compile', 'connect', 'watch' ] ); //, 'version' ] );
