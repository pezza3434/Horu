var React = require('react');
var Router = require('react-router');
var routes = require('../public/javascript/routes');
var alt = require('../public/javascript/alt.js');
var url = require('url');
import routeActions from '../public/javascript/actions/routeActions';

export default function (req, res) {

    var assetPath;
    var bootstrapData = {};
    let facebookId;

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
        facebookId = '560295737450758';
    }

    if (process.env.NODE_ENV === 'production') {
        assetPath = '/';
        facebookId = '960352310705738';
    }

    router.run(function (Handler, state) {
        routeActions.pathChange(state.path);
        var html = React.renderToString( < Handler / > );
        res.render('index', {
            html: html,
            assetPath: assetPath,
            nodeEnv: process.env.NODE_ENV,
            queryParameters: JSON.stringify(url.parse(req.originalUrl, true).query),
            isProduction: process.env.NODE_ENV === 'production',
            facebookId: facebookId
        });
        return alt.flush();
    });
}
