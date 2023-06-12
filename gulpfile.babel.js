import gulp from "gulp";
const { src, dest, parallel, series, watch } = gulp;

// Load plugins
import browsersync from 'browser-sync'
import dotenv from "dotenv";
import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import concat from 'gulp-concat'
import aliases from 'gulp-style-aliases'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import { fileURLToPath } from 'url';
import path from "path";
import { rimraf } from "rimraf";
import webpackStream from "webpack-stream";
import TerserPlugin from "terser-webpack-plugin";

dotenv.config();
const server = browsersync.create();
const ENV = process.env.ENVIRONMENT;
const PRODUCTION = ENV === 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceRoot = path.join(__dirname)

const sass = gulpSass(dartSass);

function clean() {
    return rimraf('dist')
}

function js() {
    const sourcePaths = ['./assets/js/frontend.js']

    return src(sourcePaths)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(webpackStream({
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env']
                        },
                        resolve: {
                            fullySpecified: false,
                        },
                    }
                ]
            },
            mode: ENV,
            devtool: ENV === 'development' ? 'source-map' : false,
            output: {
                publicPath: ".",
                filename: "bundle.min.js",
            },
        }))
        .pipe(dest('dist/js'))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write('', { sourceRoot: sourceRoot })))
        .pipe(server.stream())
}

function css() {
    const sources = ['./assets/scss/frontend.scss', './dotstarter/**/**/*.scss']

    return src(sources)
        .pipe(aliases({
            "@global": "./assets/scss"
        }))
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat('frontend.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulpif(!PRODUCTION, cssnano()))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(dest('./dist/css/'))
        .pipe(server.stream())
}

function adminCss() {
    const sources = ['./assets/scss/admin.scss', './assets/scss/**/*.scss', './dotstarter/**/**/*.scss']

    return src(sources)
        .pipe(aliases({
            "@global": "./assets/scss"
        }))
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat('admin.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulpif(!PRODUCTION, cssnano()))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(dest('./dist/css/'))
        .pipe(server.stream())
}

// Watch files
function watchFiles() {
    watch(['./assets/scss/admin.scss', './assets/scss/**/*.scss', './dotstarter/**/**/*.scss'], adminCss)
    watch(['./assets/scss/**/*.scss', './dotstarter/**/**/*.scss'], css)
    watch(['./assets/js/frontend.js', './assets/js/**/*.js', './dotstarter/**/**/*.js'], js)
}

// BrowserSync
function browserSync() {
    server.init({
        proxy: process.env.DEV_URL,
        https: false,
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series
const watchTask = parallel(watchFiles, browserSync);
export { watchTask }
export default series(clean, parallel(js, css, adminCss));

