require('./components/global.scss');

import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import alt from './alt';
import cookieUtil from './utils/cookieUtil';

if(cookieUtil.getItem('horu')) {
    alt.bootstrap(JSON.stringify({
        sessionStore: {
            authenticationToken: cookieUtil.getItem('horu'),
            isLoggedIn:true
        },
        configurationStore: {
            environment: window.node_env
        }
    }));
}

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById("app-container"));
});
