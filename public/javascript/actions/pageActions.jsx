var alt = require('../alt');

var pageActions = {
    appLoaded() {
        this.dispatch();
    }
};

export default alt.createActions(pageActions);
