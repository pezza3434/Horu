import alt from '../alt';
import imagesActions from '../actions/imagesActions';

class imagesStore {
    constructor() {

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
            this.imageDeleteSuccessful = false;
        });

        this.bindListeners({
            deleteImage: imagesActions.deleteImage,
            deleteImageSuccess: imagesActions.deleteImageSuccess,
            toggleModal: imagesActions.toggleModal
        });

    }

    deleteImage () {
        this.apiCallInProgress = true;
    }

    deleteImageSuccess (response) {
        this.imageDeleteSuccessful = true;
        this.response = response.body;
    }

}



module.exports = alt.createStore(imagesStore, 'imagesStore');
