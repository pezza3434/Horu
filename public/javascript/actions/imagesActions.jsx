var alt = require('../alt');
var request = require('superagent');
var ratingsActions = require('./ratingsActions');
var sessionStore = require('../stores/sessionStore');
var configurationStore = require('../stores/configurationStore');

var imagesActions = {
    deleteImage(id) {
        request
        .del(configurationStore.getServerUrl() + '/images?id=' + id)
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .end((err,res) => {
            this.actions.deleteImageSuccess(res);
        });
        this.dispatch(id);
    },
    deleteImageSuccess(imageResponse) {
        this.dispatch(imageResponse);
        ratingsActions.getRatings();
    },
    toggleModal() {
        this.dispatch();
    }
};

export default alt.createActions(imagesActions);
