var alt = require('../alt');
var isotopeActions = require('../actions/isotopeActions');

var isotopeStore = function () {

    this.isotopeImages = [];
    this.apiCallInProgress = false;

    this.bindListeners({
        getImages: isotopeActions.getImages,
        getImagesSuccess: isotopeActions.getImagesSuccess,
    });
}

isotopeStore.prototype.getImages = function () {
    this.apiCallInProgress = true;
}

isotopeStore.prototype.getImagesSuccess = function (response) {
    this.isotopeImages = response.body;
    this.apiCallInProgress = false;
}

isotopeStore.prototype.submitAge = function () {
    this.apiCallInProgress = true;
}

isotopeStore.prototype.submitAgeSuccess = function () {
    this.apiCallInProgress = false;
}

module.exports = alt.createStore(isotopeStore, 'TestStore');
