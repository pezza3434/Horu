var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

function facesSubmitted(isotopeState) {
    return isotopeState.filter(face => face.formSubmitted);
}

export class unwrappedIsotopeStore {
    constructor() {
        this.isotopeImages = [];
        this.isotopeState = [];

        this.on('beforeEach', function () {
            this.error = false;
            this.apiCallInProgress = false;
        });

        this.bindActions(isotopeActions);

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
                return facesSubmitted(this.getState().isotopeState);
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
            newState.validationError = false;
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

    submitAgeError (faceIndex) {
        this.isotopeState[faceIndex].validationError = true;
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

    refreshImagesSuccess(imagesResponse) {
        var index = this.isotopeState.length;

        var availableImages = imagesResponse.body.slice(0);

        while (index--) {
            if (this.isotopeState[index].formSubmitted) {
                var newImage = availableImages.pop();
                if (newImage) {
                    this.isotopeState[index].containerClicked = false;
                    this.isotopeState[index].displayForm = false;
                    this.isotopeState[index].formSubmitted = false;
                    this.isotopeState[index].secondaryImage = false;
                    this.isotopeImages[index] = newImage;
                    this.isotopeState[index].validationError = false;
                } else {
                    this.isotopeState.splice(index, 1);
                    this.isotopeImages.splice(index, 1);
                }
            }
        }

    }

    refreshImagesError(response) {
        let facesSubmitted = this.isotopeState.filter(face => face.formSubmitted).length;
        let totalFaces = this.isotopeState.length;

        if (facesSubmitted === totalFaces) {
            this.error = {status:response.statusCode, message: response.body.error};
        }

        var index = this.isotopeState.length;
        while (index--) {
            if (this.isotopeState[index].formSubmitted) {
                this.isotopeState.splice(index, 1);
                this.isotopeImages.splice(index, 1);
            }
        }

    }

}



export default alt.createStore(unwrappedIsotopeStore, 'isotopeStore');
