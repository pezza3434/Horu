var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');

var imagesActions = {
    deleteImage(id) {
        request
        .del('http://generation.com:3000/images?id=' + id)
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
