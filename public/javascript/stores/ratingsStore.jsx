import alt from '../alt';
import ratingsActions from '../actions/ratingsActions';
import imagesActions from '../actions/imagesActions';

class ratingsStore {
    constructor() {

        this.ratings = [];

        this.imageIdToBeDeleted;

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            getRatings: ratingsActions.getRatings,
            getRatingsSuccess: ratingsActions.getRatingsSuccess,
            toggleModal: ratingsActions.toggleModal,
            deleteImage: imagesActions.deleteImage,
            deleteImageSuccess: imagesActions.deleteImageSuccess
        });

        this.exportPublicMethods({

            hasRatings() {
                return this.getState().ratings.length > 0;
            },

        });
    }

    getRatings () {
        this.apiCallInProgress = true;
    }

    getRatingsSuccess (response) {
        this.ratings = response.body;
    }

    toggleModal (state) {
        this.showModal = state.showModal;
        this.idToDelete = state.idToDelete;
    }

    deleteImage(id) {
        this.imageIdToBeDeleted = id;
    }

    deleteImageSuccess() {
        this.ratings = this.ratings.filter((rating) => rating.image_id !== this.imageIdToBeDeleted);
    }
}



module.exports = alt.createStore(ratingsStore, 'ratingsStore');
