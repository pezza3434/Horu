var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

class isotopeStore {
    constructor() {
        this.isotopeImages = [];
        this.apiCallInProgress = false;

        this.bindListeners({
            getImages: isotopeActions.getImages,
            getImagesSuccess: isotopeActions.getImagesSuccess,
        });
    }

    getImages () {
        this.apiCallInProgress = true;
    }

    getImagesSuccess (response) {
        this.isotopeImages = response.body;
        this.apiCallInProgress = false;
    }

    submitAge () {
        this.apiCallInProgress = true;
    }

    submitAgeSuccess () {
        this.apiCallInProgress = false;
    }
}



module.exports = alt.createStore(isotopeStore, 'isotopeStore');
