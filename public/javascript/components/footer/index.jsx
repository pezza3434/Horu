if (typeof window !== "undefined") {
    require('./style.scss');
}

import React from 'react';
import sessionActions from '../../actions/sessionActions';
import sessionStore from '../../stores/sessionStore';

module.exports = React.createClass({
    getInitialState() {
        return {
            loggedIn: false
        }
    },
    componentDidMount() {
        sessionStore.listen(this._sessionStoreChange);
        this.setState({loggedIn: sessionStore.isLoggedIn()});
    },
    _sessionStoreChange(storeState) {
        this.setState({loggedIn:storeState.isLoggedIn})
    },
    logout() {
        sessionActions.logout()
    },
    render() {
        return (
            <div className="footer">
              <div className="col-sm-2 no-padding">
                <div className="footer__ratings">We would love your feedback</div>
              </div>
              {this.state.loggedIn ?<div className="footer__logout btn btn-default" onClick={this.logout}>Logout</div> : '' }
            </div>
        )
    }
});
