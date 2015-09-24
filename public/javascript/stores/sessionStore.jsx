var alt = require('../alt');
var sessionActions = require('../actions/sessionActions');

var sessionStore = function () {
    this.isLoggedIn = false;
    this.authenticationToken = '';
    this.user = '';

    this.on('beforeEach', function () {
        this.apiCallInProgress = false;
        this.isError = false;
    });

    this.bindListeners({
        authenticate: sessionActions.authenticate,
        authenticateResponse: sessionActions.authenticateResponse,
        authenticationErrorResponse: sessionActions.authenticationErrorResponse,
        getUser: sessionActions.getUser,
        getUserResponse: sessionActions.getUserResponse
    });

    this.exportPublicMethods({
        isLoggedIn: function () {
            return this.getState().isLoggedIn;
        },
        getAuthenticationToken: function () {
            return this.authenticationToken;
        }
    });
};

sessionStore.prototype.authenticate = function () {
    this.apiCallInProgress = true;
}

sessionStore.prototype.authenticateResponse = function (response) {
    this.isLoggedIn = true;
    this.authenticationToken = response.body.token;
}

sessionStore.prototype.authenticationErrorResponse = function (err) {
    this.isError = true;
}

sessionStore.prototype.getUser = function () {
    this.apiCallInProgress = true;
}

sessionStore.prototype.getUserResponse = function (response) {
    this.user = response.body;
}

module.exports = alt.createStore(sessionStore, 'sessionStore');
