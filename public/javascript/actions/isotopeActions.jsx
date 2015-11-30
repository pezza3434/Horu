var alt = require('../alt');
var request = require('superagent');
var configurationStore = require('../stores/configurationStore');

var isotopeActions = {

    displayName: 'isotopeActions',

    getImages() {
        var sessionStore = require('../stores/sessionStore');
        var isotopeStore = require('../stores/isotopeStore').default;

        let endpoint;

        let imageIdsToExclude = isotopeStore.imageIdsCurrentlyBeingDisplayed(sessionStore.isLoggedIn());

        if (!sessionStore.isLoggedIn() && imageIdsToExclude.length) {
            endpoint = `${configurationStore.getServerUrl()}/images?exclude=${imageIdsToExclude.join(',')}`;
        } else {
            endpoint = `${configurationStore.getServerUrl()}/images`;
        }

        var req = request.get(endpoint);

        if (sessionStore.getAuthenticationToken()) {
            req.set('x-access-token', sessionStore.getAuthenticationToken());
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
                if (err) {
                    return this.actions.submitAgeError(faceIndex);
                }
                this.actions.submitAgeSuccess(res);
            });
        } else {
            request
            .post(configurationStore.getServerUrl() + '/ratings')
            .send(postData)
            .end((err,res) => {
                if (err) {
                    return this.actions.submitAgeError(faceIndex);
                }
                this.actions.submitAgeSuccess(res);
            });
        }

        this.dispatch({faceIndex, ageGuessed});
    },
    submitAgeSuccess(ratingsResponse) {
        this.dispatch(ratingsResponse);
    },
    submitAgeError(faceIndex) {
        this.dispatch(faceIndex);
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
    refreshImages() {
        var sessionStore = require('../stores/sessionStore');
        var isotopeStore = require('../stores/isotopeStore').default;

        let endpoint;

        let imageIdsToExclude = isotopeStore.imageIdsCurrentlyBeingDisplayed(sessionStore.isLoggedIn());

        if(imageIdsToExclude && isotopeStore.imageIdsCurrentlyBeingDisplayed().length) {
            endpoint = `${configurationStore.getServerUrl()}/images?exclude=${imageIdsToExclude.join(',')}`;
        } else {
            endpoint = `${configurationStore.getServerUrl()}/images`;
        }

        var req = request.get(endpoint);

        if (sessionStore.getAuthenticationToken()) {
            req.set('x-access-token', sessionStore.getAuthenticationToken());
        }

        req.end((err,res) => {
            if (err) {
                return this.actions.refreshImagesError(res);
            }
            this.actions.refreshImagesSuccess(res);
        });

        this.dispatch();
    },
    refreshImagesSuccess(res) {
        this.dispatch(res);
    },
    refreshImagesError(res) {
        this.dispatch(res);
    }
};

export default alt.createActions(isotopeActions);
