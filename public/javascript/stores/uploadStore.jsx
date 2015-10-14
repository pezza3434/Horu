import alt from '../alt';
import uploadActions from '../actions/uploadActions';

class uploadStore {
    constructor() {

        this.showModal = false;
        this.uploadSuccess = false;

        this.on('beforeEach', function () {
            this.uploadSuccess = false;
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            postUpload: uploadActions.postUpload,
            postUploadSuccess: uploadActions.postUploadSuccess,
            triggerModal: uploadActions.triggerModal
        });

    }

    postUpload () {
        this.apiCallInProgress = true;
    }

    postUploadSuccess (response) {
        this.uploadSuccess = true;
        this.response = response.body;
    }

    triggerModal (modalState) {
        this.showModal = modalState;
    }

}



module.exports = alt.createStore(uploadStore, 'uploadStore');
