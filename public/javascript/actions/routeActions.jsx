import alt from '../alt';

const routeActions = {

    displayName: 'routeActions',

    pathChange(value) {
        this.dispatch(value);
    }

};

export default alt.createActions(routeActions);
