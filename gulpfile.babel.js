import gulp from 'gulp';
import gulpif from "gulp-if";
import sourcemaps from 'gulp-sourcemaps';
import { deleteSync } from 'del';
import webpack from "webpack";
import gulpWebpack from "webpack-stream";
import path from 'path';
import { fileURLToPath } from 'url';
import named from "vinyl-named";
import autoprefixer from "autoprefixer";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import minifyCSS from "gulp-clean-css";
import rename from "gulp-rename";
import 'dotenv/config'
import browsersync from 'browser-sync';

const server = browsersync.create();

const ENV = process.env.ENVIRONMENT; // Get from yargs if defined,cli
const PRODUCTION = ENV === 'production';

const sass = gulpSass(dartSass);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dest = path.resolve(__dirname, 'dist');

const dirs = {
  dest,
  js: dest + '/js',
  css: dest + '/css',
};


const scripts = [
  'assets/js/**/*.js'
]

const scriptsEntryPoint = [
  'assets/js/frontend.js',
];

const styles = [
  'assets/scss/**/*.scss'
]

const stylesEntryPoints = [
  'assets/scss/frontend.scss',
  'assets/scss/admin.scss'
]


const js = (watch = false) => {
  return gulp.src(scriptsEntryPoint)
    .pipe(named())
    .pipe(gulpWebpack({
      target: 'web',
      mode: PRODUCTION ? 'production' : 'development',
      devtool: 'eval-cheap-module-source-map',
      watch,
      output: {
        filename: 'bundle.js',
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.ENV': JSON.stringify(process.env.ENV),
        })
      ],
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            resolve: {
              fullySpecified: false,
            },
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            },
          },
        ]
      },
    }, webpack
    ))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dirs.js))
    .pipe(server.stream())
}

/* CSS */
const css = () => {
  return gulp.src(stylesEntryPoints)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(postcss([autoprefixer()]))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write(dirs.css)))
    .pipe(gulp.dest(dirs.css))
    .pipe(server.stream())
}


const buildJS = () => {
  return js()
}

const buildCSS = () => {
  return css()
}

const watchJS = () => {
  return gulp.watch(scripts, js(true))
}

const watchCSS = () => {
  return gulp.watch(styles, css)
}

const watch = () => {
  return gulp.parallel(watchJS, gulp.series(cleanCSS, watchCSS))
}

const clean = (cb) => {
  deleteSync(dirs.css)
  deleteSync(dirs.js)
  cb()
}

const cleanCSS = (cb) => {
  deleteSync(dirs.css)
  cb()
}

const cleanJS = (cb) => {
  deleteSync(dirs.js)
  cb()
}

const browserSync = () => {
  server.init({
    proxy: process.env.DEV_URL,
    https: false,
    port: 3000
  });
}

gulp.task('dev', gulp.series(clean, gulp.parallel(watch, browserSync)))

gulp.task('watch', gulp.series(clean, gulp.parallel(watchJS, gulp.series(buildCSS, watchCSS))));
gulp.task('watch:css', gulp.series(cleanCSS, buildCSS, watchCSS))
gulp.task('watch:js', gulp.series(cleanJS, watchJS))

gulp.task('build', gulp.series(clean, gulp.parallel(buildJS, buildCSS)))
gulp.task('build:css', gulp.series(cleanCSS, buildCSS))
gulp.task('build:js', gulp.series(cleanJS, buildJS))
