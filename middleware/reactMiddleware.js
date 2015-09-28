var express = require('express');
var React = require('react');
var Router = require('react-router')
var routes = require('../public/javascript/routes');

module.exports = function (req, res, next) {
    var router = Router.create({
        location: req.url,
        routes: routes
    });
    router.run(function (Handler, state) {
        var html = React.renderToString( < Handler / > )
        return res.render('index', {
            html: html
        })
    });
}
