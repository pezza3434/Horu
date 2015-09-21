var alt = require('../alt');
var request = require('superagent');

var actions = {
    authenticate(data) {
        request
        .post('http://generation.com:3000/authenticate')
        .send(data)
        .end((err,res) => {
            this.actions.authenticateResponse(res);
        });
        this.dispatch();
    },
    authenticateResponse(authenticationResponse) {
        this.dispatch(authenticationResponse);
    },

};

module.exports = alt.createActions(actions);
