import React from 'react';

import UserProfile from './userProfile';

export default React.createClass({
    render() {
        return(
            <div>
                <div className="col-xs-7 col-sm-12 user-info">
                    {this.props.user ?
                        <UserProfile
                            serverUrl={this.props.serverUrl}
                            user={this.props.user}
                            sidebarClickedAction={this.props.sidebarClickedAction}
                            /> : ''}
                </div>
                <div className="col-xs-5 col-sm-0 logout-area">
                    <button
                        onClick={this.props.logoutHandler}
                        className="btn btn-logout-user-info">logout</button>
                </div>
            </div>
        );
    }
});
