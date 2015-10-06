var alt = require('../alt');
var sessionActions = require('../actions/sessionActions');

class sessionStore {
    constructor() {
        this.isLoggedIn = false;
        this.authenticationToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoicGV6emEzNDM0IiwiZW1haWwiOiJhbGV4cGVycnkyQGdtYWlsLmNvbSIsImlhdCI6MTQ0NDExNDgxMywiZXhwIjoxNDQ0MjAxMjEzfQ.ib2eQK0Y0AdySlmxPp0Ivwgi1f374K5CfzbTcv5gp7s';
        this.user = '';

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
            this.isError = false;
            this.registrationError = false;
            this.successfulRegistration = false;
        });

        this.bindListeners({
            authenticate: sessionActions.authenticate,
            authenticateResponse: sessionActions.authenticateResponse,
            authenticationErrorResponse: sessionActions.authenticationErrorResponse,
            getUser: sessionActions.getUser,
            getUserResponse: sessionActions.getUserResponse,
            postUser: sessionActions.postUser,
            postUserResponse: sessionActions.postUserResponse,
            postUserError: sessionActions.postUserError
        });

        this.exportPublicMethods({

            isLoggedIn() {
                return this.getState().isLoggedIn;
            },

            getAuthenticationToken() {
                return this.getState().authenticationToken;
            }

        });
    }

    authenticate () {
        this.apiCallInProgress = true;
    }

    authenticateResponse (response) {
        this.isLoggedIn = true;
        this.authenticationToken = response.body.token;
    }

    authenticationErrorResponse (err) {
        this.isError = true;
    }

    getUser () {
        this.apiCallInProgress = true;
    }

    getUserResponse (response) {
        this.user = response.body;
    }

    postUser () {
        this.apiCallInProgress = true;
    }

    postUserResponse (response) {
        this.successfulRegistration = true;
    }

    postUserError (err) {
        this.registrationError = true;
    }

}

module.exports = alt.createStore(sessionStore, 'sessionStore');
