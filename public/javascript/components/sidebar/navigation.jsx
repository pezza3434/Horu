import React from 'react';
import {Link} from 'react-router';
import cn from 'classnames';

export default React.createClass({
    render() {
        return (
            <div className="col-sm-12 navigation no-padding">
                <ul>
                    <li className={cn({'active': this.props.path === '/'})}>
                            <Link href="/#/" to="/"><i className="fa fa-home"></i>Face Feed</Link>
                    </li>
                    {this.props.isLoggedIn
                        ? <li className={cn({'active': this.props.path === '/account'})}>
                                    <Link href="/#/account" to="account"><i className="fa fa-users"></i>Your Dashboard</Link>
                            </li>
                        : ''}
                    <li className={cn({'active': this.props.path === '/about'})}>
                            <Link href="/#/about" to="about"><i className="fa fa-info"></i>About Horu</Link>
                    </li>
                </ul>
            </div>
        );
    }
});
