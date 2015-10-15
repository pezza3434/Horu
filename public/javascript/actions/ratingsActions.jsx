var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');
var configurationStore = require('../stores/configurationStore');

var ratingsActions = {
    getRatings() {
        request
        .get(configurationStore.getServerUrl() + '/ratings')
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
