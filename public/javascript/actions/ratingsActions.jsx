var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');

var ratingsActions = {
    getRatings() {
        request
        .get('http://generation.com:3000/ratings')
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .end((err,res) => {
            this.actions.getRatingsSuccess(res);
        });
        this.dispatch();
    },
    getRatingsSuccess(ratingsResponse) {
        this.dispatch(ratingsResponse);
    },
    toggleModal(modalState) {
        this.dispatch(modalState);
    }

};

module.exports = alt.createActions(ratingsActions);
