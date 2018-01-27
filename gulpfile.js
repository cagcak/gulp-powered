const gulp  = require('gulp'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-htmlmin'),
    nunjucksRender = require('gulp-nunjucks-render'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');

const PATHS = {
  output: 'dist',
  partials: 'src/partials',
  pages: 'src/pages',
  locales: 'src/locales/i18n',
  modules: "node_modules/",
  helpers: 'src/lib/',
  scripts: 'src/js/'
}

gulp.task('js', function() {
    gulp.src([
            PATHS.modules + 'jquery/dist/jquery.js',
            PATHS.modules + 'bootstrap/dist/js/bootstrap.js',
            PATHS.helpers + 'browserstate/scripts/bundled/html4+html5/jquery.history.js',
            PATHS.modules + '@fortawesome/fontawesome/index.js',
            PATHS.helpers + 'websanova/url.min.js',
            PATHS.helpers + 'jquery.i18n/libs/CLDRPluralRuleParser/src/CLDRPluralRuleParser.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.messagestore.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.fallbacks.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.language.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.parser.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.emitter.js',
            PATHS.helpers + 'jquery.i18n/src/jquery.i18n.emitter.bidi.js',
            PATHS.scripts + '/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    gulp.src([
            PATHS.modules + 'bootstrap/dist/css/bootstrap.css',
            'src/css/**/*.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function() {
    gulp.src([
            'src/media/img/**/*'
        ])
        .pipe(gulp.dest('dist/img'));
});

gulp.task('nunjucks', function() {
    console.log('Rendering nunjucks files..');
    return gulp.src(PATHS.pages + '/**/*.+(html|js|css)')
        .pipe(nunjucksRender({
          path: [PATHS.partials],
          watch: true,
        }))
        .pipe(gulp.dest(PATHS.output));
});

gulp.task('i18n', function () {
  console.log('Copying translation files..');
  return gulp.src(PATHS.locales + '/**/*.json')
    .pipe(gulp.dest(PATHS.output + '/locales/i18n'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: PATHS.output
        },
    });
});

gulp.task('watch', function() {
    // trigger Nunjucks render when pages or templates changes
    gulp.watch([PATHS.pages + '/**/*.+(html|js|css)', PATHS.partials + '/**/*.+(html|js|css)'], ['nunjucks'])

    // reload browsersync when `dist` changes
    gulp.watch(PATHS.output + '/*').on('change', browserSync.reload);
});

gulp.task('watch', function() {

        gulp.watch('src/css/**/*.css', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('css');
        });

        gulp.watch('src/js/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('js');
        });

        gulp.watch('src/media/img/**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('img');
        });
});

gulp.task('minify', function() {
  return gulp.src(PATHS.output + '/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        /*cssmin: true,
        jsmin: true,*/
        removeOptionalTags: true,
        removeComments: true
    }))
    .pipe(gulp.dest(PATHS.output));
});

// run browserSync auto-reload together with nunjucks auto-render
gulp.task('auto', ['browserSync', 'watch']);
// gulp.task('prepare', ['extract-locales']);
gulp.task('default', function() {
    gulp.run('js', 'css', 'img' , 'i18n' , 'nunjucks', 'browserSync');
});
