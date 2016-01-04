import alt from '../alt';

class sidebarStore {
    constructor() {

        this.displaySettingsModal = false;
        this.settingsModel = {};
        this.apiCallInProgress = false;

        this.reduce = (state, action) => {

            if (action.type === 'sidebarActions.toggleSettingsModal') {
                return Object.assign({}, state, {displaySettingsModal:action.payload, settingsSaveText: 'Save'});
            }

            if (action.type === 'sidebarActions.toggleWeeklySetting') {
                return Object.assign({}, state, {settingsSaveText: 'Save', settingsModel: Object.assign({}, state.settingsModel, {weekly: action.payload})});
            }

            if (action.type === 'sidebarActions.fetchSettingsSuccess') {
                return Object.assign({}, state, {settingsModel: action.payload, preferencesGetInProgress: false});
            }

            if (action.type ==='sidebarActions.fetchSettings') {
                return Object.assign({}, state, {preferencesGetInProgress: true});
            }

            if (action.type === 'sidebarActions.savePreferences') {
                return Object.assign({}, state, {preferencesPostInProgress: true, settingsSaveText: 'Saving...'});
            }

            if (action.type === 'sidebarActions.savePreferencesSuccess') {
                return Object.assign({}, state, {preferencesPostInProgress: false, settingsSaveText: 'Successfully Saved'});
            }

            this.preventDefault();
        };

    }

}

export default alt.createStore(sidebarStore, 'sidebarStore');
