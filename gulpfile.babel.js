var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    path = require('path'),
    config = require('./webpack.config');

gulp.task('dev', function() {
    var listen_addr = '0.0.0.0',
        listen_port = 3000,
        server = new WebpackDevServer(
                        webpack(config), 
                        {
                            contentBase: path.join(__dirname, 'build', 'public'),
                            hot: true,
                            historyApiFallback: true,
                            proxy: {
                                '*': 'http://localhost:8888'
                            }
                        }
                     );

    server.listen(listen_port, listen_addr, function(err, result) {
        if (err) {
            console.log('ERROR: ' + err);
            return;
        }

        console.log('Dev server up at http://' + listen_addr + ':' + listen_port);
    });
});

gulp.task('js', ['js:clean'], function(done) {
    webpack(config).run(handleWebpackCompletion.bind(this, done));
});

gulp.task('js:watch', ['js:clean'], function(done) {
    webpack(config).watch({}, handleWebpackCompletion.bind(this, done));
});

gulp.task('js:clean', function() {
    return gulp.src([config.output.path]).pipe(rimraf());
});

gulp.task('default', ['dev']);


/**
 * Handles async completion of webpack compilation.
 *
 * @param {function} done function to call after completion.
 * @param {string} err error message.
 * @param {object} stats success: compilation stats.
 */
function handleWebpackCompletion(done, err, stats) {
    if (err) {
        // Compile failed
        console.error(err);
    }
    else {
        // Compile succeeded
        console.log(stats.toString());
    }
}