require('./components/global.scss');

import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';
import alt from './alt';
import cookieUtil from './utils/cookieUtil';

var bootstrapData = {};

if ( document.location.pathname==='/password-reset' ) {
    bootstrapData.loginStore = {
        showResetPasswordForm: true,
        showModal: true
    };
}

if(cookieUtil.getItem('horu')) {

    bootstrapData.sessionStore = {
        authenticationToken: cookieUtil.getItem('horu'),
        isLoggedIn:true
    };

}

bootstrapData.configurationStore = {
    environment: window.node_env
};

alt.bootstrap(JSON.stringify(bootstrapData));

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('app-container'));
});
