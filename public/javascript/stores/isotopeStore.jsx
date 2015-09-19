var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

var testStore = function () {

    this.isotopeImages = [];
    this.apiCallInProgress = false;

    this.bindListeners({
        handleApiCallStatus: isotopeActions.getImages,
        handleIsotopeImages: isotopeActions.getImagesSuccess
    });
}

testStore.prototype.handleIsotopeImages = function (response) {
    this.isotopeImages = response.body;
    this.apiCallInProgress = false;
}

testStore.prototype.handleApiCallStatus = function () {
    this.apiCallInProgress = true;
}

module.exports = alt.createStore(testStore, 'TestStore');
