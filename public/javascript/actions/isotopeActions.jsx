var alt = require('../alt');
var request = require('superagent');

var actions = {
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

        request
        .post('http://generation.com:3000/ratings')
        .send(postData)
        .end((err,res) => {
            this.submitAgeSuccess(res);
        });

        this.dispatch();
    },
    submitAgeSuccess(ratingsResponse) {
        this.dispatch(ratingsResponse);
    }

};

module.exports = alt.createActions(actions);
