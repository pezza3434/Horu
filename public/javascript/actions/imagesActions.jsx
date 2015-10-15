var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');
var configurationStore = require('../stores/configurationStore');

var imagesActions = {
    deleteImage(id) {
        request
        .del(configurationStore.getServerUrl() + '/' + id)
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .end((err,res) => {
            this.actions.deleteImageSuccess(res);
        });
        this.dispatch(id);
    },
    deleteImageSuccess(imageResponse) {
        this.dispatch(imageResponse);
    },
    toggleModal() {
        this.dispatch();
    }
};

module.exports = alt.createActions(imagesActions);
