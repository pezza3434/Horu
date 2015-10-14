if (typeof window !== "undefined") {
    require('./style.scss');
}

import React from 'react';
import sessionActions from '../../actions/sessionActions';

module.exports = React.createClass({
    logout() {
        sessionActions.logout()
    },
    render() {
        return (
            <div className="footer">
              <div className="col-sm-2 no-padding">
                <div className="footer__ratings">We would love your feedback</div>
              </div>
              <div className="footer__logout btn btn-default" onClick={this.logout}>Logout</div>
            </div>
        )
    }
});
