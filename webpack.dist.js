var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = [{
    entry: "./public/javascript/app.js",
    output: {
        filename: "./public/javascript/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        },
        {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        },{
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
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("./public/styles.css"),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
}];
