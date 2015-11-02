import alt from '../alt';

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
            };
        });

        //store state is bootstrapped

        this.exportPublicMethods({
            getServerUrl() {
                var state = this.getState();
                if(state.environment){
                    return state.configuration[state.environment].url;
                }
            }
        });
    }

}

export default alt.createStore(configurationStore, 'configurationStore');
