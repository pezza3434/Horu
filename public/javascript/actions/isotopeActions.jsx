var alt = require('../alt');
var request = require('superagent');

var isotopeActions = {
    getImages() {
        request
        .get('http://generation.com:3000/images')
        .end((err,res) => {
            this.actions.getImagesSuccess(res);
        });
        this.dispatch();
    },
    getImagesSuccess(imagesResponse) {
        this.dispatch(imagesResponse);
    },
    submitAge(postData) {
        var sessionStore = require('../stores/sessionStore');

        if(sessionStore.getAuthenticationToken()) {
            request
            .post('http://generation.com:3000/ratings')
            .set('x-access-token', sessionStore.getAuthenticationToken())
            .send(postData)
            .end((err,res) => {
                this.actions.submitAgeSuccess(res);
            });
        } else {
            request
            .post('http://generation.com:3000/ratings')
            .send(postData)
            .end((err,res) => {
                this.actions.submitAgeSuccess(res);
            });
        }

        this.dispatch();
    },
    submitAgeSuccess(ratingsResponse) {
        this.dispatch(ratingsResponse);
    }

};

module.exports = alt.createActions(isotopeActions);
