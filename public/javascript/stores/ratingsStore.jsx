import alt from '../alt';
import ratingsActions from '../actions/ratingsActions';

class ratingsStore {
    constructor() {

        this.ratings = [];

        this.on('beforeEach', function () {
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            getRatings: ratingsActions.getRatings,
            getRatingsSuccess: ratingsActions.getRatingsSuccess,
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
}



module.exports = alt.createStore(ratingsStore, 'ratingsStore');
