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
            mouseEnteredContainer: isotopeActions.mouseEnteredContainer,
            populateImageRequestSuccess: isotopeActions.populateImageRequestSuccess,
            resetImageState: isotopeActions.resetImageState
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
            newState.secondaryImage = false;
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

    populateImageRequestSuccess(imagesResponse) {
        var submittedFace = this.isotopeState.filter(face => face.formSubmitted === true);
        if(submittedFace.length > 0) {
            submittedFace[0].secondaryImage = imagesResponse.body[0].path;
            submittedFace[0].formSubmitted = false;
        }
    }

    resetImageState(imagesResponse) {

        this.isotopeState.forEach((face, index) => {
            if(face.secondaryImage) {
                this.isotopeImages[index] = imagesResponse.body[0];
                this.isotopeState[index].secondaryImage = false;
            }
        });



    }

}



module.exports = alt.createStore(isotopeStore, 'isotopeStore');
