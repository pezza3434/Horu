import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render() {
        return (
            <div className="col-sm-12 navigation no-padding">
                <ul>
                    <li>
                        <div className="navigation__center">
                            <i className="fa fa-home"></i>
                            <Link to="isotope" href="/#/">Home</Link>
                            </div>
                            </li>
                        {this.props.isLoggedIn ? <li>
                            <div className="navigation__center">
                            <i className="fa fa-users"></i>
                            <Link to="account" href="/#/account">Your Account</Link>
                            </div>
                    </li> : ''}
                </ul>
            </div>
        );
    }
});
