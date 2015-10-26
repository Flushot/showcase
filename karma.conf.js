module.exports = function (config) {
    config.set({
        browsers: [
            'Chrome',
            'Safari'
            // 'PhantomJS'
        ],

        // karma only needs to know about the test bundle
        files: [
            'tests.bundle.js'
        ],

        frameworks: [
            'mocha',
            'chai'
        ],

        plugins: [
            'karma-chrome-launcher',
            'karma-safari-launcher',
            // 'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],

        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            'tests.bundle.js': [ 
                'webpack', 
                'sourcemap'
            ]
        },

        reporters: [
            'dots'
        ],

        singleRun: false,

        // webpack config object
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ],
            }
        },
        webpackMiddleware: {
            noInfo: true,  // Disable verbose logging of webpack compilation.
        }
    });
};
