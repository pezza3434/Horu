var alt = require('../alt');
var request = require('superagent');

var pageActions = {
    appLoaded() {
        this.dispatch();
    }
};

module.exports = alt.createActions(pageActions);
