if (typeof window !== "undefined") {
    require('./style.scss');
}

import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

import isotopeActions from '../../actions/isotopeActions';
import sessionActions from '../../actions/sessionActions';

import sessionStore from '../../stores/sessionStore';
import isotopeStore from '../../stores/isotopeStore';
import configurationStore from '../../stores/configurationStore';

import LoginButton from '../login-button/index';
import RegisterButton from '../register-button/index';
import UserProfile from './user-profile/index';


module.exports = React.createClass({
    getInitialState() {
        return ({isLoggedIn: sessionStore.isLoggedIn()})
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
            <div className="col-sm-2 sidebar">
                    <div className="row">
                        <div className="sidebar__logo">
                            <div className="sidebar__logo__text">HORU</div>
                        </div>
                    </div>
                    <div className="row user-area">
                        <div className="col-xs-6 col-sm-12 user-info">
                            {!this.state.isLoggedIn ?
                            <div className="navigation__center">
                                <div className='user-info__login'>
                                    <div className="user-info__login"><LoginButton /></div>|
                                    <div className="user-info__register"><RegisterButton /></div>
                                </div>
                            </div>
                            : '' }
                            {this.state.user && this.state.isLoggedIn ? <UserProfile serverUrl={this.state.serverUrl} user={this.state.user}/> : ''}
                        </div>
                        {this.state.isLoggedIn ?
                        <div className="col-xs-6 col-sm-0 logout-area">
                            <button onClick={this._logoutHandler} className="btn btn-logout-user-info">logout</button>
                        </div>
                        : ''}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 navigation no-padding">
                            <ul>
                                <li>
                                    <div className="navigation__center">
                                        <i className="fa fa-home"></i>
                                        <Link to="isotope" href="/#/">Home</Link>
                                        </div>
                                        </li>
                                    {this.state.isLoggedIn ? <li>
                                        <div className="navigation__center">
                                        <i className="fa fa-users"></i>
                                        <Link to="account" href="/#/account">Your Account</Link>
                                        </div>
                                </li> : ''}
                            </ul>
                        </div>
                    </div>
                </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
    }
});
