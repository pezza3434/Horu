import React from 'react'; //eslint-disable-line
import alt from '../public/javascript/alt.js';
import url from 'url';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import routes from '../public/javascript/routes';

export default function(req, res) {

    var assetPath;
    var bootstrapData = {};
    let facebookId;

    if (!req.cookies.welcomeMessage || req.cookies.welcomeMessage !== 'closed') {
        bootstrapData.bannerStore = {
            displayWelcomeMessage: true
        };
    }

    if (req.cookies.horu) {
        bootstrapData.sessionStore = {
            authenticationToken: req.cookies.horu,
            isLoggedIn: true
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

    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        var html = ReactDOM.renderToString(
            <RoutingContext {...renderProps}/>
        );
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
