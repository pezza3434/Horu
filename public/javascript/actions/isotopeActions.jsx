var alt = require('../alt');
var request = require('superagent');
var configurationStore = require('../stores/configurationStore');

var isotopeActions = {
    getImages() {
        var sessionStore = require('../stores/sessionStore');

        var req = request
        .get(configurationStore.getServerUrl() + '/images')

        if (sessionStore.getAuthenticationToken()) {
            req.set('x-access-token', sessionStore.getAuthenticationToken())
        }

        req.end((err,res) => {
            if (err) {
                return this.actions.getImagesError(res);
            }
            this.actions.getImagesSuccess(res);
        });

        this.dispatch();
    },
    getImagesSuccess(imagesResponse) {
        this.dispatch(imagesResponse);
    },
    getImagesError(imagesResponse) {
        this.dispatch(imagesResponse);
    },
    submitAge(faceIndex, postData) {
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
    },
    populateImageRequest(imageIdsToExclude) {
        var sessionStore = require('../stores/sessionStore');
        if(sessionStore.getAuthenticationToken()) {
            request
            .get(configurationStore.getServerUrl() + '/images/1/?exclude=' + imageIdsToExclude.join(','))
            .set('x-access-token', sessionStore.getAuthenticationToken())
            .end((err,res) => {
                this.actions.populateImageRequestSuccess(res);
            });
        } else {
            request
            .get(configurationStore.getServerUrl() + '/images/1?exclude=' + imageIdsToExclude.join(','))
            .end((err,res) => {
                this.actions.populateImageRequestSuccess(res);
            });

        }
        this.dispatch();
    },
    populateImageRequestSuccess(res) {
        this.dispatch(res);
        this.actions.resetImageState(res);
    },
    resetImageState(res) {
        this.dispatch(res);
    }


};

module.exports = alt.createActions(isotopeActions);
