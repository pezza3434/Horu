import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render() {
        return (
            <div className="col-sm-12 navigation no-padding">
                <ul>
                    <li>
                            <Link href="/#/" to="isotope"><i className="fa fa-home"></i>Face Feed</Link>
                    </li>
                    {this.props.isLoggedIn
                        ? <li>
                                    <Link href="/#/account" to="account"><i className="fa fa-users"></i>Your Dashboard</Link>
                            </li>
                        : ''}
                    <li>
                            <Link href="/#/about" to="about"><i className="fa fa-info"></i>About Horu</Link>
                    </li>
                </ul>
            </div>
        );
    }
});
