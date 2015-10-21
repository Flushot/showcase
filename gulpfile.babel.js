var gulp = require('gulp'),
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
                            historyApiFallback: true
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

gulp.task('default', ['dev']);
