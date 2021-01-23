import gulp from 'gulp';
import pug from 'gulp-pug';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import imageminSvgo from 'imagemin-svgo';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';

const paths = {
  html: {
    src: 'src/pug/**/*.pug',
    dest: 'dist/',
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
  },
  images: {
    src: 'src/img/**/*.{jpg,png,jpeg,gif,svg}',
    dest: 'dist/img/',
  },
};

export const clean = () => del(['dist']);

export function serve() {
  return browserSync.init({
    server: {
      baseDir: './dist',
    },
    open: false,
  });
}

export function html() {
  return gulp
    .src(paths.html.src)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

export function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

export function images() {
  return gulp
    .src(paths.images.src, { since: gulp.lastRun(images) })
    .pipe(imagemin([
      imageminSvgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false },
          { removeUselessDefs: false },
          { removeUnknownsAndDefaults: false },
        ]
      }),
    ]))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

export function watch() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images));

const defaultTask = gulp.parallel(build, serve, watch);

gulp.task('build', build);

gulp.task('default', defaultTask);

export default defaultTask;
