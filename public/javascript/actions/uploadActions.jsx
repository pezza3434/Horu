var alt = require('../alt');
var request = require('superagent');
var sessionStore = require('../stores/sessionStore');

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
    },
    postUploadError(err) {
        this.dispatch(err);
    }
};

module.exports = alt.createActions(uploadActions);
