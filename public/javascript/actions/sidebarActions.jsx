import alt from '../alt';
import request from 'superagent';
import configurationStore from '../stores/configurationStore';
import sessionStore from '../stores/sessionStore';
import sidebarStore from '../stores/sidebarStore';

const sidebarActions = {

    displayName: 'sidebarActions',

    toggleSettingsModal(value) {
        if (sidebarStore.getState().settingsModel.weekly === undefined) {
            this.dispatch(value);
            return this.actions.fetchSettings();
        }

        this.dispatch(value);
    },

    fetchSettings() {
        request
        .get(configurationStore.getServerUrl() + '/preferences')
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .end((err,res) => {
            if (err) {
                return this.actions.fetchSettingsError();
            }
            this.actions.fetchSettingsSuccess(res);
        });

        this.dispatch();

    },

    fetchSettingsSuccess(res) {
        this.dispatch(res.body[0]);
    },

    fetchSettingsError() {
        this.dispatch();
    },

    toggleWeeklySetting(value) {
        this.dispatch(value);
    },

    savePreferences(model) {
        request
        .post(configurationStore.getServerUrl() + '/preferences')
        .set('x-access-token', sessionStore.getAuthenticationToken())
        .send(model)
        .end((err,res) => {
            if (err) {
                return this.actions.savePreferencesError();
            }
            this.actions.savePreferencesSuccess(res);
        });
        this.dispatch();
    },

    savePreferencesSuccess () {
        this.dispatch();
    },

    savePreferencesError() {
        this.dispatch();
    }

};

export default alt.createActions(sidebarActions);
