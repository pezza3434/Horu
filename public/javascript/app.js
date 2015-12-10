require('./components/global.scss');

import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line
import routes from './routes.jsx';
import alt from './alt';
import cookieUtil from './utils/cookieUtil';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router} from 'react-router';

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

if(!cookieUtil.getItem('welcomeMessage') || cookieUtil.getItem('welcomeMessage') !== 'closed') {
    bootstrapData.bannerStore = {
        displayWelcomeMessage: true
    };
}

bootstrapData.configurationStore = {
    environment: window.node_env
};

alt.bootstrap(JSON.stringify(bootstrapData));

let history = createBrowserHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app-container'));
