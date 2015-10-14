if (typeof window !== "undefined") {
    var cookieUtil = require('../utils/cookieUtil');
}

var alt = require('../alt');
var sessionActions = require('../actions/sessionActions');
var pageActions = require('../actions/pageActions');
var isotopeActions = require('../actions/isotopeActions');

class sessionStore {
    constructor() {
        this.isLoggedIn = false;
        this.authenticationToken = '';

        this.on('beforeEach', function() {
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
            postUserError: sessionActions.postUserError,
            appLoaded: pageActions.appLoaded,
            updateVoteCount: isotopeActions.submitAgeSuccess
        });

        this.exportPublicMethods({

            isLoggedIn() {
                return this.getState()
                    .isLoggedIn;
            },

            getAuthenticationToken() {
                return this.getState()
                    .authenticationToken;
            }

        });
    }

    appLoaded () {

    }

    authenticate () {
        this.apiCallInProgress = true;
    }

    authenticateResponse (response) {
        this.isLoggedIn = true;
        this.authenticationToken = response.body.token;

        if(cookieUtil) {
            cookieUtil.setItem('horu', response.body.token);
        }

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

    updateVoteCount() {
        if(this.user){
            this.user.votes++;
        }
    }

}

module.exports = alt.createStore(sessionStore, 'sessionStore');
