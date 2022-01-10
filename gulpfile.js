'use strict';
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer 		= require('autoprefixer');
const babel 		 	= require('gulp-babel');
const cleanCss 			= require('gulp-clean-css');
const concat 		 	= require('gulp-concat');
const postcss      		= require('gulp-postcss');
const sass 		 		= require('gulp-sass');
const plumber 	 		= require('gulp-plumber');
const pug 				= require('gulp-pug');
const sourcemaps   		= require('gulp-sourcemaps');
const notify 		 	= require('gulp-notify');
const rename 		 	= require('gulp-rename');
const uglify 		 	= require('gulp-uglify');
const htmlmin 		 	= require('gulp-htmlmin');
const iconfont 	 		= require('gulp-iconfont');
const iconfontCss  		= require('gulp-iconfont-css');
const browserSync  		= require('browser-sync').create();
const del		  		= require('del');
const runTimestamp 		= Math.round(Date.now()/1000);

/**
1. Compile SCSS:
	- Build: scss
	- Watch: scss:watch

2. Compile JS:
	- Build: js

3. Watch CSS & JS:
	- Build: watch
*/

const paths = {
	src: {
		fonts : 'src/fonts',
		scss : 'src/scss',
		js : 'src/js',
		html : 'src/html',
	},
	dist: {
		fonts : 'assets/fonts',
		css : 'assets/css',
		js : 'assets/js',
		plugins : 'assets/plugins'
	},
	node_modules: 'node_modules'
}

const fontName = 'customicon';

// Browser Sync
const server = (done)=> {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	});
	done();
};

const browserSyncReload = (done)=> {
	browserSync.reload();
	done();
}

// Clean
const clean = ()=> del(['dist']);

const html = ()=> {
	return src([paths.src.html + '/*.pug'])
	.pipe(plumber({
    	errorHandler: function (error) {
		notify.onError({
			title: 'Pug Error',
			message: 'Error: <%= error.message %>',
			sound: 'Beep'
		})(error);
		this.emit('end');
	}}))
	.pipe(pug({
		doctype: 'html',
		pretty: false,
		locals : {imageSize : require("image-size")}
	}))
	// .pipe(rename({
    //     extname: '.php'
	// }))
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(dest('./'))
	.pipe(browserSync.stream({stream: true}));
}

const htmlWatch = ()=> {
	watch([paths.src.html + '/**/*'], series('html', browserSyncReload)); 
};

const fonts = ()=> {
	return src([paths.src.fonts + '/icons/*.svg'], {base: paths.src.scss}) // Source folder containing the SVG images
		.pipe(iconfontCss({
			cssClass: 			fontName, // The name that the generated font will have
			fontName: 			fontName, // The name that the generated font will have
			path: 				'node_modules/gulp-iconfont-css/templates/_icons.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
			targetPath: 		'../../../'+ paths.src.scss +'/fonts/_customicon.scss', // The path where the file will be generated
			fontPath: 			'../fonts/icons/' // The path to the icon font file
		}))
		.pipe(iconfont({
			fontHeight: 1000,
			prependUnicode: false, // Recommended option 
			fontName: fontName, // Name of the font
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // The font file formats that will be created
			normalize: true,
			timestamp: runTimestamp // Recommended to get consistent builds when watching files
		}))
		.pipe(dest(paths.dist.fonts + '/icons'));
};

// Sass task: compiles the style.scss file into style.css
const scss = ()=> {
    return src(paths.src.scss + '/style.scss')
	    .pipe(plumber({
    	errorHandler: function (error) {
    		notify.onError({
    			title: 'Build CSS',
    			message: 'Error: <%= error.message %>',
    			sound: 'Beep'
    		})(error);
    		this.emit('end');
    	}}))
    	.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer() ])) 
		.pipe(dest(paths.dist.css))
		.pipe(cleanCss({level: {1: {specialComments: 0}}}))
	    .pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(paths.dist.css))
		.pipe(browserSync.stream({stream: true}));
}

const scssWatch = ()=> {
	watch([paths.src.scss + '/**/*'], series('scss', browserSyncReload)); 
};

// JS task: concatenates and uglifies JS files to script.js
const js = ()=> {
	return src([
            // 'Your URL',
            // paths.node_modules + '/jquery/dist/jquery.min.js',
            // paths.node_modules + '/popper.js/dist/umd/popper.min.js',
            // paths.node_modules + '/bootstrap/dist/js/bootstrap.min.js',
            // paths.node_modules + '/slick-carousel/slick/slick.min.js',
            // paths.node_modules + '/babel-polyfill/dist/polyfill.js',
            paths.src.js + '/main.js'
		])
	.pipe(plumber({
	errorHandler: function (error) {
		notify.onError({
			title: 'Build JS',
			message: 'Error: <%= error.message %>',
			sound: 'Beep'
		})(error);
		this.emit('end');
	}}))
	.pipe(babel({
		presets: [
			['@babel/env', {
				modules: false
			}]
		]
	}))
	.pipe(sourcemaps.init())
	.pipe(concat('style.js'))
	.pipe(dest(paths.dist.js))

	.pipe(rename('style.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(dest(paths.dist.js))
	.pipe(browserSync.stream({stream: true}));
};

const jsWatch = ()=> {
	watch([paths.src.js], series('js', browserSyncReload)); 
};

const plugins = ()=>{
    return src([
	    paths.node_modules + '/remixicon' + '/**/*',
		paths.node_modules + '/animate.css' + '/**/*',

		paths.node_modules + '/jquery' + '/**/*',
		paths.node_modules + '/bootstrap' + '/**/*',
		paths.node_modules + '/popper.js' + '/**/*',

		paths.node_modules + '/velocity-animate' + '/**/*',

		paths.node_modules + '/snapsvg' + '/**/*',

		paths.node_modules + '/swiper' + '/**/*',

		paths.node_modules + '/photoswipe' + '/**/*',

		// paths.node_modules + '/datatables.net' + '/**/*',
		// paths.node_modules + '/datatables.net-bs4' + '/**/*',
		// paths.node_modules + '/datatables.net-responsive' + '/**/*',
		// paths.node_modules + '/datatables.net-responsive-bs4' + '/**/*'
	], { base: './node_modules' })
    .pipe(dest(paths.dist.plugins))
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
const watchTask = ()=> {
    htmlWatch();
	scssWatch();
	jsWatch(); 
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.server = server;
exports.fonts = fonts;
exports.html = html;
exports.scss = scss;
exports.js = js;

exports.plugins = plugins;

exports.htmlWatch = htmlWatch;
exports.scssWatch = scssWatch;
exports.jsWatch = jsWatch;

exports.default = series(
    clean,
	parallel(scss, js, html), 
	server,
	watchTask
);