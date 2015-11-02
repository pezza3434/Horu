var alt = require('../alt');
var request = require('superagent');
var configurationStore = require('../stores/configurationStore');

var sessionActions = {
    authenticate(data) {
        request
        .post(configurationStore.getServerUrl() + '/authenticate')
        .send(data)
        .end((err,res) => {
            if(err){
                return this.actions.authenticationErrorResponse(err);
            }
            this.actions.authenticateResponse(res);
        });
        this.dispatch();
    },
    authenticateResponse(authenticationResponse) {
        var isotopeActions = require('./isotopeActions');
        this.dispatch(authenticationResponse);
        this.actions.getUser(authenticationResponse.body.token);
        isotopeActions.getImages();
    },
    authenticationErrorResponse(err) {
        this.dispatch(err);
    },
    getUser(authenticationToken) {
        request
        .get(configurationStore.getServerUrl() + '/user')
        .set('x-access-token', authenticationToken)
        .end((err,res) => {
            this.actions.getUserResponse(res);
        });
        this.dispatch();
    },
    getUserResponse(getUserResponse) {
        this.dispatch(getUserResponse);
    },
    postUser(registrationData) {
        request
        .post(configurationStore.getServerUrl() + '/user')
        .send(registrationData)
        .end((err,res) => {
            if(err){
                return this.actions.postUserError(err);
            }
            this.actions.postUserResponse(res);
            this.actions.authenticate({username:registrationData.username, password: registrationData.password});
        });
        this.dispatch();
    },
    postUserResponse(postUserResponse) {
        this.dispatch(postUserResponse);
    },
    postUserError(postUserError) {
        this.dispatch(postUserError);
    },
    logout() {
        this.dispatch();
        var isotopeActions = require('./isotopeActions');
        isotopeActions.getImages();
    }
};

export default alt.createActions(sessionActions);
