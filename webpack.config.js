/*
  TODO: add a production flag that disables debug/sourcemaps and minifies
 */

var webpack = require('webpack'),
    path = require('path'),
    assign = require('object-assign'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var config = assign({},
    {
        devtool: 'sourcemap'
    },
    {
        entry: {
            app: [
                'webpack-dev-server/client?http://0.0.0.0:3000',  // webpack host:port
                'webpack/hot/only-dev-server',  // prevent reload on syntax errors
                './src/index.js'  // entry point
            ],
            vendor: Object.keys(require('./package.json').dependencies)
        },

        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'build', 'public')
        },

        // Full list of webpack plugins are available at:
        // https://github.com/webpack/docs/wiki/list-of-plugins
        plugins: [
            // Splitting vendor code into its own bundle
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.bundle.js',
                minChunks: Infinity
            }),

            // Hot reloading of modules on code changes
            new webpack.HotModuleReplacementPlugin(),

            // Don't emit assets that contain errors
            new webpack.NoErrorsPlugin(),

            // Building index.html
            new HtmlWebpackPlugin({
                title: 'Assets',
                filename: 'index.html',
                template: 'src/index.template.html',
                inject: true
            })
        ],

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'src'),
                    //exclude: /node_modules/,
                    loaders: [
                        'react-hot', 
                        'babel?stage=0'
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    include: path.join(__dirname, 'src', 'scss'),
                    loaders: [
                        'style', 
                        'css', 
                        'sass'
                    ]
                },
                {
                    // inline base64 URLs for <=8k images, direct URLs for the rest
                    test: /\.(svg|png)$/,
                    loader: 'url-loader?limit=8192'
                }
            ]
        }
    });

module.exports = config;
