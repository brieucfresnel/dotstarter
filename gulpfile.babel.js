import webpack from 'webpack-stream';
import {src, dest, watch, series, parallel} from 'gulp';
import yargs from 'yargs';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import named from 'vinyl-named';
import del from "del";
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.prod;
const sass = require('gulp-sass')(require('node-sass'));

export const scripts = () => {
    return src(['assets/js/frontend.js', 'assets/js/admin.js'])
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },
            mode: PRODUCTION ? 'production' : 'development',
            devtool: !PRODUCTION ? 'inline-source-map' : false,
            output: {
                filename: '[name].js'
            },
            externals: {
                jquery: 'jQuery'
            }
        }))
        .pipe(dest('dist/js'));
}

export const generalStyles = () => {
    return src(['assets/scss/frontend.scss', 'assets/scss/admin.scss'])
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
        .pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(dest('dist/css'))
        .pipe(server.stream());
}

export const layoutStyles = () => {
    return src(['layouts/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
        .pipe(gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(dest(file => file.base))
        .pipe(server.stream());
}


export const watchForChanges = () => {
    watch('templates/*.php', series(generalStyles, reload));
    watch('assets/scss/**/*.scss', series(generalStyles, reload));
    watch('layouts/**/*', series(layoutStyles, reload));
    watch('assets/js/**/*.js', series(scripts, reload));
}

export const clean = () => del(['dist']);

const server = browserSync.create();

export const serve = done => {
    server.init({
        proxy: "clospadulis.test" // TODO gulp config : dynamic proxy URL
    });
    done();
};

export const reload = done => {
    server.reload();
    done();
};

export const dev = series(clean, parallel(generalStyles, layoutStyles, scripts), serve, watchForChanges);
export const build = series(clean, generalStyles, layoutStyles, scripts)
export default dev;