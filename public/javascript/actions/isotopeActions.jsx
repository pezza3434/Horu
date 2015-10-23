var alt = require('../alt');
var request = require('superagent');
var configurationStore = require('../stores/configurationStore');

var isotopeActions = {
    getImages() {
        request
        .get(configurationStore.getServerUrl() + '/images')
        .end((err,res) => {
            this.actions.getImagesSuccess(res);
        });
        this.dispatch();
    },
    getImagesSuccess(imagesResponse) {
        this.dispatch(imagesResponse);
    },
    submitAge(postData, faceIndex) {
        var sessionStore = require('../stores/sessionStore');
        var ageGuessed = postData.rating;

        if(sessionStore.getAuthenticationToken()) {
            request
            .post(configurationStore.getServerUrl() + '/ratings')
            .set('x-access-token', sessionStore.getAuthenticationToken())
            .send(postData)
            .end((err,res) => {
                this.actions.submitAgeSuccess(res);
            });
        } else {
            request
            .post(configurationStore.getServerUrl() + '/ratings')
            .send(postData)
            .end((err,res) => {
                this.actions.submitAgeSuccess(res);
            });
        }

        this.dispatch({faceIndex, ageGuessed});
    },
    submitAgeSuccess(ratingsResponse) {
        this.dispatch(ratingsResponse);
    },
    clickedFace(faceIndex) {
        this.dispatch(faceIndex);
    },
    mouseEnteredContainer(faceIndex) {
        this.dispatch(faceIndex);
    },
    mouseLeftContainer(faceIndex) {
        this.dispatch(faceIndex);
    }

};

module.exports = alt.createActions(isotopeActions);
