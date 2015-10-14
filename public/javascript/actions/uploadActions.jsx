var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');
var ratingsActions = require('./ratingsActions');

var uploadActions = {
    postUpload(dataURL) {
        request
        .post('http://generation.com:3000/upload')
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .send({data:dataURL})
        .end((err,res) => {
            if(err){
                return this.actions.postUploadError;
            }
            this.actions.postUploadSuccess(res);
        });
        this.dispatch();
    },
    postUploadSuccess(uploadResponse) {
        this.dispatch(uploadResponse);
        ratingsActions.getRatings();
    },
    postUploadError(err) {
        this.dispatch(err);
    },
    triggerModal(state) {
        this.dispatch(state);
    }
};

module.exports = alt.createActions(uploadActions);
