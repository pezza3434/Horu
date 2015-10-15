import alt from '../alt';
import imagesActions from '../actions/imagesActions';

class configurationStore {
    constructor() {

        this.on('beforeEach', function () {
            this.configuration = {
                development: {
                    url: 'http://generation.com:3000'
                },
                production: {
                    url: 'http://46.101.54.208:3000'
                }
            }
        });

        //store state is bootstrapped

        this.exportPublicMethods({
            getServerUrl() {
                var state = this.getState();
                console.log(state, 'environment');
                return state.configuration[state.environment].url;
            }
        });
    }

}

module.exports = alt.createStore(configurationStore, 'configurationStore');
