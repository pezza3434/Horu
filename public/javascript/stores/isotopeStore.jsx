var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

class isotopeStore {
    constructor() {
        this.isotopeImages = [];
        this.apiCallInProgress = false;
        this.isotopeState = [];

        this.bindListeners({
            getImages: isotopeActions.getImages,
            getImagesSuccess: isotopeActions.getImagesSuccess,
            clickedFace: isotopeActions.clickedFace,
            mouseLeftContainer: isotopeActions.mouseLeftContainer
        });
    }

    getImages () {
        this.apiCallInProgress = true;
    }

    getImagesSuccess (response) {
        this.isotopeImages = response.body;
        this.apiCallInProgress = false;
        this.isotopeState = response.body.reduce(function(isotopeState, image){
            isotopeState.containerClicked = false,
            isotopeState.push({});
            return isotopeState
        }, []);
    }

    submitAge () {
        this.apiCallInProgress = true;
    }

    submitAgeSuccess () {
        this.apiCallInProgress = false;
    }

    clickedFace(faceIndex) {
        this.isotopeState[faceIndex].containerClicked = true;
    }

    mouseLeftContainer(faceIndex) {
        this.isotopeState[faceIndex].containerClicked = false;
    }

}



module.exports = alt.createStore(isotopeStore, 'isotopeStore');
