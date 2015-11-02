var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');
var ratingsActions = require('./ratingsActions');
var configurationStore = require('../stores/configurationStore');
var sessionActions = require('./sessionActions');

var uploadActions = {
    postUpload(dataURL) {
        var req = request
        .post(configurationStore.getServerUrl() + '/upload')
        .on('progress', (e) => {
            if(e.percent) {
                this.actions.updateUploadProgress(e);
            }
        })
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .send({data:dataURL})
        .end((err,res) => {
            if(err){
                // return console.log(err)
            }
            this.actions.postUploadSuccess(res);
        });
        this.dispatch(req.xhr);
    },
    postUploadSuccess(uploadResponse) {
        this.dispatch(uploadResponse);
        ratingsActions.getRatings();
        sessionActions.getUser(sessionStore.getAuthenticationToken());
    },
    updateUploadProgress(e) {
        this.dispatch(e.percent);
    },
    postUploadError(err) {
        this.dispatch(err);
    },
    triggerModal(state) {
        this.dispatch(state);
    },
    selectNewImage(ev) {
        this.dispatch(ev);
    },
    abortUpload(xhrObject){
        xhrObject.abort();
        this.dispatch();
    },
    beginFacialRecognition() {
        this.dispatch();
    },
    facialRecognitionSuccess() {
        this.dispatch();
    },
    facialRecognitionError() {
        this.dispatch();
    }
};

export default alt.createActions(uploadActions);
