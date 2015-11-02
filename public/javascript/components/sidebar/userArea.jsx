import React from 'react';

import LoginButton from '../login-button/index';
import RegisterButton from '../register-button/index';

import UserProfile from './userProfile';

export default React.createClass({
    render() {
        return(
            <div>
                <div className="col-xs-6 col-sm-12 user-info">
                    {!this.props.isLoggedIn ?
                    <div className="navigation__center">
                        <div className='user-info__login'>
                            <div className="user-info__login"><LoginButton /></div>|
                            <div className="user-info__register"><RegisterButton /></div>
                        </div>
                    </div>
                    : '' }
                    {this.props.user && this.props.isLoggedIn ?
                        <UserProfile
                            serverUrl={this.props.serverUrl}
                            user={this.props.user}/> : ''}
                </div>
                {this.props.isLoggedIn ?
                <div className="col-xs-6 col-sm-0 logout-area">
                    <button
                        onClick={this.props._logoutHandler}
                        className="btn btn-logout-user-info">logout</button>
                </div>
                : ''}
            </div>
        )
    }
});
