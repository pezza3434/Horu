var path = require("path");

module.exports = [{
    context: path.join(__dirname, "public", "javascript"),
    entry: "app",
    output: {
        path: path.join(__dirname, "public", "javascript"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    resolve: {
        // You can now require('file') instead of require('file.coffee')
        extensions: ["", ".js", ".jsx"],
        root: [path.join(__dirname, "public", "javascript")],
        modulesDirectories: ["node_modules"]
    }
}];
