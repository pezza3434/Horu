var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
        files: [
            './tests.webpack.js'
        ],
        reporters: ['progress'],
        preprocessors: {
            // add webpack as preprocessor
            './tests.webpack.js': ['webpack']
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: true,
        webpack: {
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader'
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }, {
                    test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                }, {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(
                        // activate source maps via loader query
                        'css?sourceMap!' +
                        'sass?sourceMap&')
                }, ]
            },
            resolve: {
                alias: {
                    'components': path.join(__dirname,'public/javascript/components')
                },
                extensions: ['', '.js', '.jsx']
            },
            plugins: [
                new ExtractTextPlugin("./public/styles.css")
            ]
        }
    })
}
