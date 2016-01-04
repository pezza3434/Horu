if (typeof window !== 'undefined') {
    const history = require('../../history');
    require('./style.scss');
}

import React from 'react';

import sessionActions from '../../actions/sessionActions';
import sidebarActions from '../../actions/sidebarActions';

import sessionStore from '../../stores/sessionStore';
import configurationStore from '../../stores/configurationStore';
import sidebarStore from '../../stores/sidebarStore';

import Logo from './logo';
import Navigation from './navigation';
import UserAreaLoggedIn from './userAreaLoggedin';
import UserAreaLoggedOut from './userAreaLoggedOut';
import SettingsModal from './settingsModal';

export default React.createClass({
    getInitialState() {
        return sessionStore.getState();
    },
    componentDidMount(){
        let sessionStoreState = sessionStore.getState();

        if (sessionStoreState.isLoggedIn && !sessionStoreState.user) {
            sessionActions.getUser(sessionStore.getAuthenticationToken());
        }

        sessionStore.listen(this._sessionStoreChange);
        sidebarStore.listen(this._sidebarStoreChange);

        this.setState({serverUrl: configurationStore.getServerUrl()});

    },
    _sidebarClickedAction(e, eventKey) {

        if (eventKey === '1') {
            this.props.history.pushState(null,'/account');
        }

        if (eventKey === '2') {
            sidebarActions.toggleSettingsModal(true);
        }

        if (eventKey === '3') {
            sessionActions.logout();
            this.props.history.pushState(null,'/');
        }

    },
    _sessionStoreChange(storeState) {
        this.setState(storeState);
    },
    _sidebarStoreChange(storeState) {
        this.setState(storeState);
    },
    _closeSettingsModalAction() {
        sidebarActions.toggleSettingsModal(false);
    },
    _settingsFormChangeAction(e) {
        if (e.target.name === 'weekly') {
            sidebarActions.toggleWeeklySetting(e.target.checked);
        }
    },
    _savePreferencesAction(e) {
        e.preventDefault();
        sidebarActions.savePreferences(this.state.settingsModel);
    },
    _logoutHandler() {
        sessionActions.logout();
    },
    render() {
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                    <Logo/>
                    <div className="row user-area">
                        {this.state.isLoggedIn ?
                            <UserAreaLoggedIn
                                logoutHandler={this._logoutHandler}
                                user={this.state.user}
                                serverUrl={this.state.serverUrl}
                                sidebarClickedAction={this._sidebarClickedAction}
                                /> :
                            <UserAreaLoggedOut history={this.props.history}/>
                        }
                    </div>
                    <div className="row">
                        <Navigation isLoggedIn={this.state.isLoggedIn} path={this.props.location.pathname}/>
                    </div>
                    <a href="http://twitter.com/thehoruapp" target="_blank">
                        <div className="row social">
                            <i className="fa fa-twitter"></i>
                        </div>
                    </a>
                    <SettingsModal
                        showModal={this.state.displaySettingsModal}
                        closeModalAction={this._closeSettingsModalAction}
                        settingsFormChangeAction={this._settingsFormChangeAction}
                        savePreferencesAction={this._savePreferencesAction}
                        settingsModel={this.state.settingsModel}
                        preferencesGetInProgress={this.state.preferencesGetInProgress}
                        preferencesPostInProgress={this.state.preferencesPostInProgress}
                        settingsSaveText={this.state.settingsSaveText}
                     />
                </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
    }
});
