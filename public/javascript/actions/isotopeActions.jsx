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
    }

};

module.exports = alt.createActions(actions);
