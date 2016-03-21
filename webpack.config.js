/*
  TODO: add a production flag that disables debug/sourcemaps and minifies
 */

var webpack = require('webpack'),
    path = require('path'),
    assign = require('object-assign'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    _ = require('lodash');

var env = (process.env.NODE_ENV || 'dev');

var config = {
    entry: {
        app: [
            //'webpack-dev-server/client?http://0.0.0.0:3000',  // webpack host:port
            //'webpack/hot/only-dev-server',  // prevent reload on syntax errors
            './client/index.js'  // entry point
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
        //libraryTarget: 'commonjs2'
    },

    // Full list of webpack plugins are available at:
    // https://github.com/webpack/docs/wiki/list-of-plugins
    plugins: [
        // Splitting vendor code into its own bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),

        // Hot reloading of modules on code changes
        //new webpack.HotModuleReplacementPlugin(),

        // Don't emit assets that contain errors
        new webpack.NoErrorsPlugin(),

        // Building index.html
        new HtmlWebpackPlugin({
            title: 'Assets',
            filename: 'index.html',
            template: 'client/index.template.html',
            inject: 'body'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'client'),
                //exclude: /node_modules/,
                loaders: [
                    //'react-hot',
                    'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
                ]
            },
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'client'),
                loaders: [
                    'ts'
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
                test: /\.(woff2?|ttf|eot|svg|ico)$/,
                loader: 'file-loader'
            }
        ]
    }
};


// Production-specific configuration
switch (env) {
    case 'production':
        config.plugins = _.union(config.plugins, [
            // Deduplicate modules
            new webpack.optimize.DedupePlugin(),

            // Compress and obfuscate javascript
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
        ]);
        break;

    case 'dev':
        config.devtool = 'sourcemap';
        config.plugins = _.union(config.plugins, [
            // Hot reloading of modules on code changes
            //new webpack.HotModuleReplacementPlugin(),
        ]);
        break;

    default:
        throw new Error('Unknown environment: ' + env);
}


module.exports = config;
