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

import LoginButton from '../login-button/index';
import RegisterButton from '../register-button/index';
import UserProfile from './user-profile/index';


module.exports = React.createClass({
    getInitialState() {
        return ({loggedIn: sessionStore.isLoggedIn()})
    },
    componentDidMount() {
        sessionStore.listen(this._sessionStoreChange);
    },
    _sessionStoreChange(storeState) {
        if(storeState.isLoggedIn && storeState.user) {
            return this.setState({
                loggedIn:true,
                user:storeState.user
            });
        }

        this.setState({
            loggedIn:false,
            user: ''
        });
    },
    _userHasBeenLoaded() {

        if (!this.state.loggedIn) {
            return false;
        }

        if (this.state.loggedIn && !this.state.user) {
            sessionActions.getUser(sessionStore.getAuthenticationToken());
            return false;
        }

        return true;
    },
    render() {

        let loginButtonClasses = classNames('user-info__login', {hide: this.state.loggedIn});

        return (
            <div className="col-sm-2 sidebar no-padding">
                    <div className="sidebar__logo">
                        <div className="sidebar__logo__text">HORU</div>
                    </div>
                    <div className="col-sm-12 user-info">
                        <div className={loginButtonClasses}>
                            <div className="user-info__login"><LoginButton /></div> |
                            <div className="user-info__register"><RegisterButton /></div>
                        </div>
                        {this._userHasBeenLoaded() ? <UserProfile user={this.state.user}/> : ''}
                    </div>
                    <div className="col-sm-12 navigation no-padding">
                        <ul>
                            <li>
                                <i className="fa fa-home"></i>
                                <Link to="isotope" href="/#/">Home</Link></li>
                            {this.state.loggedIn ? <li>
                                <i className="fa fa-users"></i>
                                <Link to="account" href="/#/account">Your Account</Link>
                            </li> : ''}
                        </ul>
                    </div>
                </div>
        );
    }
});
