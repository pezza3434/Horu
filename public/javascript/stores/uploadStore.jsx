import alt from '../alt';
import uploadActions from '../actions/uploadActions';
import configurationStore from './configurationStore';

class uploadStore {
    constructor() {

        this.showModal = false;
        this.uploadSuccess = false;
        this.selectedImage;
        this.uploadProgress;

        this.on('beforeEach', function () {
            this.selectedImage = this.selectedImage || configurationStore.getServerUrl() + '/static/placeholder.jpg';
            this.uploadSuccess = false;
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            postUpload: uploadActions.postUpload,
            postUploadSuccess: uploadActions.postUploadSuccess,
            updateUploadProgress: uploadActions.updateUploadProgress,
            triggerModal: uploadActions.triggerModal,
            selectNewImage: uploadActions.selectNewImage
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
        if(!modalState) {
            this.selectedImage = configurationStore.getServerUrl() + '/static/placeholder.jpg';
        }
        this.showModal = modalState;
        this.uploadProgress = 0;
    }

    selectNewImage (e) {

        this.uploadProgress = 0;

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        let reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
          this.emitChange();
        };
        reader.readAsDataURL(files[0]);
        return false;
    }

    updateUploadProgress (percent) {
        this.apiCallInProgress = true;

        this.uploadProgress = Math.floor(percent);
    }

}



module.exports = alt.createStore(uploadStore, 'uploadStore');
