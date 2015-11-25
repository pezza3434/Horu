var React = require('react');
var Router = require('react-router');
var routes = require('../public/javascript/routes');
var alt = require('../public/javascript/alt.js');
var url = require('url');

export default function (req, res) {

    var assetPath;
    var bootstrapData = {};

    var router = Router.create({
        location: req.url,
        routes: routes
    });

    if(!req.cookies.welcomeMessage || req.cookies.welcomeMessage !== 'closed') {
        bootstrapData.bannerStore = {
            displayWelcomeMessage: true
        };
    }

    if(req.cookies.horu) {
        bootstrapData.sessionStore = {
            authenticationToken: req.cookies.horu,
            isLoggedIn:true
        };
    }

    bootstrapData.configurationStore = {
        environment: process.env.NODE_ENV || 'development'
    };

    alt.bootstrap(JSON.stringify(bootstrapData));

    if (process.env.NODE_ENV === 'development') {
        assetPath = 'http://localhost:8080/public/';
    }

    if (process.env.NODE_ENV === 'production') {
        assetPath = '/';
    }

    router.run(function (Handler) {
        var html = React.renderToString( < Handler / > );
        res.render('index', {
            html: html,
            assetPath: assetPath,
            nodeEnv: process.env.NODE_ENV,
            queryParameters: JSON.stringify(url.parse(req.originalUrl, true).query),
            isProduction: process.env.NODE_ENV === 'production'
        });
        return alt.flush();
    });
}
