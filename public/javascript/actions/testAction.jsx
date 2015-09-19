var alt = require('../alt');

var actions = {
    updateSomething(theThing) {
        this.dispatch(theThing);
    }
};

module.exports = alt.createActions(actions);
