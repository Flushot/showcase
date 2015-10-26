/*
  TODO: add a production flag that disables debug/sourcemaps and minifies
 */

var webpack = require('webpack'),
    path = require('path'),
    assign = require('object-assign'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var env = (process.env.NODE_ENV || 'dev');

var config = assign({},
    {
        devtool: 'sourcemap'
    },
    {
        entry: {
            app: [
                'webpack-dev-server/client?http://0.0.0.0:3000',  // webpack host:port
                'webpack/hot/only-dev-server',  // prevent reload on syntax errors
                './client/index.js'  // entry point
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
                template: 'client/index.template.html',
                inject: true
            })
        ],

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname, 'client'),
                    //exclude: /node_modules/,
                    loaders: [
                        'react-hot', 
                        'babel?stage=0'
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    include: path.join(__dirname, 'client', 'styles'),
                    loaders: [
                        'style', 
                        'css', 
                        'sass'
                    ]
                },
                {
                    test: /\.css$/,
                    include: path.join(__dirname, 'client', 'styles'),
                    loaders: [
                        'style', 
                        'css'
                    ]
                },
                {
                    // inline base64 URLs for <=8k images, direct URLs for the rest
                    test: /\.(svg|png)$/,
                    loader: 'url-loader?limit=8192'
                },
                {
                    test: /\.(woff2?|ttf|eot|svg)$/,
                    loader: 'file-loader'
                }
            ]
        }
    });

module.exports = config;
