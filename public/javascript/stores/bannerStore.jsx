import alt from '../alt';
import cookieUtil from '../utils/cookieUtil';

class bannerStore {
    constructor() {

        this.displayWelcomeMessage = false;
        this.welcomeMessageHasbeenClosed = false;

        this.on('bootstrap', () => {
            // In here because bootstrap override everything within 'this'
            this.reduce = (state, action) => {

                if (action.type === 'bannerActions.toggleWelcomeMessage') {
                    if (action.payload === false) {
                        cookieUtil.setItem('welcomeMessage', 'closed');
                    }

                    return Object.assign({}, state, {displayWelcomeMessage: false, welcomeMessageHasbeenClosed:true});

                }

                this.preventDefault();
            };

        });

    }


}

export default alt.createStore(bannerStore, 'bannerStore');
