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
            vendor: ['react']
        },

        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'build', 'public')
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin(
                /* chunkName= */"vendor", 
                /* filename= */"vendor.bundle.js"
            ),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new HtmlWebpackPlugin({
                title: 'Assets',
                filename: 'index.html',
                template: 'src/index.template.html',
                inject: true
            })
        ],

        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['react-hot', 'babel?stage=0']
            }, {
                test: /\.scss$/,
                include: path.join(__dirname, 'src', 'scss'),
                loaders: ['style', 'css', 'sass']
            }, {
                // inline base64 URLs for <=8k images, direct URLs for the rest
                test: /\.(svg|png)$/,
                loader: 'url-loader?limit=8192'
            }]
        }
    });

module.exports = config;
