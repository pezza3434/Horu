var express = require('express');
var router = express.Router();
require("node-jsx").install({
    extension: ".jsx"
});
var React = require('react');
var App = React.createFactory(require("../public/javascript/components/app"));

    /* GET home page. */
    router.get('/', function (req, res, next) {
        var markup = React.renderToString(
            App()
        );

        res.render('index', {
            markup: markup
        });
    });

module.exports = router;
