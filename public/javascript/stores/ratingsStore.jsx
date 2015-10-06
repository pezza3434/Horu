import alt from '../alt';
import ratingsActions from '../actions/ratingsActions';

class ratingsStore {
    constructor() {

        this.ratings = [];
        this.showDeleteModal = false;

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            getRatings: ratingsActions.getRatings,
            getRatingsSuccess: ratingsActions.getRatingsSuccess,
            toggleModal: ratingsActions.toggleModal
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
}



module.exports = alt.createStore(ratingsStore, 'ratingsStore');
