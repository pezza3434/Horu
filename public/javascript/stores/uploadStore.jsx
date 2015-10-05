import alt from '../alt';
import uploadActions from '../actions/uploadActions';

class uploadStore {
    constructor() {

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            postUpload: uploadActions.postUpload,
            postUploadSuccess: uploadActions.postUploadSuccess,
        });

    }

    postUpload () {
        this.apiCallInProgress = true;
    }

    postUploadSuccess (response) {
        this.uploadSuccess = true;
        this.response = response.body;
    }
}



module.exports = alt.createStore(uploadStore, 'uploadStore');
