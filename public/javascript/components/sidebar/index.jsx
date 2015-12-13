if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import sessionActions from '../../actions/sessionActions';

import sessionStore from '../../stores/sessionStore';
import configurationStore from '../../stores/configurationStore';

import Logo from './logo';
import Navigation from './navigation';
import UserAreaLoggedIn from './userAreaLoggedin';
import UserAreaLoggedOut from './userAreaLoggedOut';

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
                        {this.state.isLoggedIn ?
                            <UserAreaLoggedIn
                                logoutHandler={this._logoutHandler}
                                user={this.state.user}
                                serverUrl={this.state.serverUrl}/> :
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
                </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
    }
});
