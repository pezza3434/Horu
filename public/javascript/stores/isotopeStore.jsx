var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

class isotopeStore {
    constructor() {
        this.isotopeImages = [];
        this.isotopeState = [];

        this.on('beforeEach', function () {
            this.error = false;
            this.apiCallInProgress = false;
        });

        this.bindListeners({
            getImages: isotopeActions.getImages,
            getImagesSuccess: isotopeActions.getImagesSuccess,
            getImagesError: isotopeActions.getImagesError,
            submitAge: isotopeActions.submitAge,
            submitAgeSuccess: isotopeActions.submitAgeSuccess,
            clickedFace: isotopeActions.clickedFace,
            mouseLeftContainer: isotopeActions.mouseLeftContainer,
            mouseEnteredContainer: isotopeActions.mouseEnteredContainer,
            populateImageRequestSuccess: isotopeActions.populateImageRequestSuccess,
            populateImageRequestError: isotopeActions.populateImageRequestError
        });

        this.exportPublicMethods({

            imageIdsCurrentlyBeingDisplayed() {
                let currentlyDisplayed = this.getState().isotopeImages.map(image => image.id);
                let previouslyDisplayed = (JSON.parse(localStorage.getItem('imageIds')) || [])
                .filter((id)=>{
                    if (currentlyDisplayed.indexOf(id) > -1) {
                        return false;
                    }
                    return true;
                });

                return currentlyDisplayed.concat(previouslyDisplayed);
            },
            getSubmittedFace() {
                return this.getState().isotopeState.filter(face => face.formSubmitted);
            }

        });
    }

    getImages () {
        this.apiCallInProgress = true;
    }

    getImagesSuccess (response) {
        if (response.body.length === 0) {
            this.error = 'No more images found';
        }
        this.isotopeImages = response.body;
        this.apiCallInProgress = false;
        this.isotopeState = response.body.reduce(function(builtState){
            var newState = {};
            newState.containerClicked = false;
            newState.displayForm = false;
            newState.formSubmitted = false;
            newState.secondaryImage = false;
            builtState.push(newState);
            return builtState;
        }, []);
    }

    getImagesError (response) {
        this.error = {status:response.statusCode, message: response.body.error};
    }

    submitAge (data) {
        this.apiCallInProgress = true;
        this.isotopeState[data.faceIndex].formSubmitted = true;
        this.isotopeState[data.faceIndex].ageGuessed = data.ageGuessed;

        let existingEntries = JSON.parse(localStorage.getItem('imageIds'));

        if (existingEntries == null) {
            existingEntries = [];
        }

        existingEntries.push(this.isotopeImages[data.faceIndex].id);

        localStorage.setItem('imageIds', JSON.stringify(existingEntries));
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
        var index = this.isotopeState.length;

        while (index--) {
            if (this.isotopeState[index].formSubmitted) {
                if (imagesResponse.body[index]) {
                    this.isotopeState[index].containerClicked = false;
                    this.isotopeState[index].displayForm = false;
                    this.isotopeState[index].formSubmitted = false;
                    this.isotopeState[index].secondaryImage = false;
                    this.isotopeImages[index] = imagesResponse.body[index];
                } else {
                    this.isotopeState.splice(index, 1);
                    this.isotopeImages.splice(index, 1);
                }
            }
        }

    }

    populateImageRequestError(response) {
        this.error = {status:response.statusCode, message: response.body.error};
    }

}



export default alt.createStore(isotopeStore, 'isotopeStore');
