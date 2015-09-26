var alt = require('../alt');
var request = require('superagent');

var sessionActions = {
    authenticate(data) {
        request
        .post('http://generation.com:3000/authenticate')
        .send(data)
        .end((err,res) => {
            if(err){
                return this.actions.authenticationErrorResponse(err)
            }
            this.actions.authenticateResponse(res);
        });
        this.dispatch();
    },
    authenticateResponse(authenticationResponse) {
        this.dispatch(authenticationResponse);
        this.actions.getUser(authenticationResponse.body.token)
    },
    authenticationErrorResponse(err) {
        this.dispatch(err)
    },
    getUser(authenticationToken) {
        request
        .get('http://generation.com:3000/user')
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
        .post('http://generation.com:3000/user')
        .send(registrationData)
        .end((err,res) => {
            if(err){
                return this.actions.postUserError(err);
            }
            this.actions.postUserResponse(res);
            this.actions.authenticate({username:registrationData.username, password: registrationData.password})
        });
        this.dispatch();
    },
    postUserResponse(postUserResponse) {
        this.dispatch(postUserResponse);
    },
    postUserError(postUserError) {
        this.dispatch(postUserError);
    }
};

module.exports = alt.createActions(sessionActions);
