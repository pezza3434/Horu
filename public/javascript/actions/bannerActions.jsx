import alt from '../alt';

const bannerActions = {

    displayName: 'bannerActions',

    toggleWelcomeMessage(value) {
        this.dispatch(value);
    }

};

export default alt.createActions(bannerActions);
