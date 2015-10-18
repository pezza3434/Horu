var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');
var ratingsActions = require('./ratingsActions');
var configurationStore = require('../stores/configurationStore');

var uploadActions = {
    postUpload(dataURL) {
        request
        .post(configurationStore.getServerUrl() + '/upload')
        .on('progress', function(e){
            console.log(e, 'e')
        })
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
    },
    selectNewImage(ev) {
        this.dispatch(ev);
    }
};

module.exports = alt.createActions(uploadActions);
