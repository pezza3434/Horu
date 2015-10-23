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
            submitAge: isotopeActions.submitAge,
            submitAgeSuccess: isotopeActions.submitAgeSuccess,
            clickedFace: isotopeActions.clickedFace,
            mouseLeftContainer: isotopeActions.mouseLeftContainer,
            mouseEnteredContainer: isotopeActions.mouseEnteredContainer
        });
    }

    getImages () {
        this.apiCallInProgress = true;
    }

    getImagesSuccess (response) {
        this.isotopeImages = response.body;
        this.apiCallInProgress = false;
        this.isotopeState = response.body.reduce(function(builtState, image){
            var newState = {};
            newState.containerClicked = false;
            newState.displayForm = false;
            newState.formSubmitted = false;
            builtState.push(newState);
            return builtState;
        }, []);
    }

    submitAge (data) {
        this.apiCallInProgress = true;
        this.isotopeState[data.faceIndex].formSubmitted = true;
        this.isotopeState[data.faceIndex].ageGuessed = data.ageGuessed;
    }

    submitAgeSuccess () {
        this.apiCallInProgress = false;
    }

    clickedFace(faceIndex) {
        this.isotopeState[faceIndex].containerClicked = true;
        this.isotopeState[faceIndex].displayForm = true;
    }

    mouseLeftContainer(faceIndex) {
        this.isotopeState[faceIndex].containerClicked = false;
        this.isotopeState[faceIndex].displayForm = false;
    }

    mouseEnteredContainer(faceIndex) {
        this.isotopeState[faceIndex].displayForm = true;
    }

}



module.exports = alt.createStore(isotopeStore, 'isotopeStore');
