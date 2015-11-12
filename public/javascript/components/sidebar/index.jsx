if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import sessionActions from '../../actions/sessionActions';

import sessionStore from '../../stores/sessionStore';
import configurationStore from '../../stores/configurationStore';

import Logo from './logo';
import Navigation from './navigation';
import UserArea from './userArea';


export default React.createClass({
    getInitialState() {
        return ({isLoggedIn: sessionStore.isLoggedIn()});
    },
    componentDidMount(){
        let sessionStoreState = sessionStore.getState();

        if(sessionStoreState.isLoggedIn && !sessionStoreState.user) {
            sessionActions.getUser(sessionStore.getAuthenticationToken());
        }

        sessionStore.listen(this._sessionStoreChange);
        this.setState({serverUrl: configurationStore.getServerUrl()});

    },
    _sessionStoreChange(storeState) {
        this.setState(storeState);
    },
    _logoutHandler() {
        sessionActions.logout();
    },
    render() {

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                    <Logo/>
                    <div className="row user-area">
                        <UserArea
                            isLoggedIn={this.state.isLoggedIn}
                            logoutHandler={this._logoutHandler}
                            user={this.state.user}
                            serverUrl={this.state.serverUrl} />
                    </div>
                    <div className="row">
                        <Navigation isLoggedIn={this.state.isLoggedIn} />
                    </div>
                    <div className="row feedback">
                        <div className="feedback__text"><a href="mailto:hello@alexperry.io"><i className="fa fa-comment"></i>  Leave some feedback..</a></div>
                    </div>
                </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
    }
});
