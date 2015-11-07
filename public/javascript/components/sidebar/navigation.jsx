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
                            <Link href="/#/" to="isotope">Home</Link>
                        </div>
                    </li>
                    {this.props.isLoggedIn
                        ? <li>
                                <div className="navigation__center">
                                    <i className="fa fa-users"></i>
                                    <Link href="/#/account" to="account">Your Account</Link>
                                </div>
                            </li>
                        : ''}
                    <li>
                        <div className="navigation__center">
                            <i className="fa fa-info"></i>
                            <Link href="/#/about" to="about">About</Link>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
});
