var alt = require('../alt');
var testAction = require('../actions/testAction');

var testStore = function () {
    this.name = 'alex';
    this.bindListeners({
        handleUpdateSomething: testAction.updateSomething
    });
}

testStore.prototype.handleUpdateSomething = function (name) {
    this.name = name;
}

module.exports = alt.createStore(testStore, 'TestStore');
