var React = require('react');
var isotopeActions = require('../../actions/isotopeActions');
var sessionActions = require('../../actions/sessionActions');
var isotopeStore = require('../../stores/isotopeStore');
var LoginButton = require('../login-button/index');
var RegisterButton = require('../register-button/index');
var UserProfile = require('./user-profile/index');
var sessionStore = require('../../stores/sessionStore');
var classNames = require('classnames');
import {Link} from 'react-router';


if (typeof window !== "undefined") {
    require('./style.scss');
}

module.exports = React.createClass({
    getInitialState() {
        return ({loggedIn: sessionStore.isLoggedIn()})
    },
    componentDidMount() {
        sessionStore.listen(this._sessionStoreChange);
    },
    _sessionStoreChange(storeState) {
        if(storeState.isLoggedIn && storeState.user) {
            this.setState({
                loggedIn:true,
                user:storeState.user
            });
        }
    },
    render() {

        var loginButtonClasses = classNames('user-info__login', {hide: this.state.loggedIn});

        return (
            <div className="col-sm-2 sidebar no-padding">
                    <div className="sidebar__logo">
                        <div className="sidebar__logo__text">HORU</div>
                    </div>
                    <div className="col-sm-12 no-padding user-info">
                        <div className={loginButtonClasses}>
                            <div className="user-info__login"><LoginButton /></div> |
                            <div className="user-info__register"><RegisterButton /></div>
                        </div>
                        {this.state.loggedIn ? <UserProfile user={this.state.user}/> : ''}
                    </div>
                    <div className="col-sm-12 navigation no-padding">
                        <ul>
                            <li>
                                <i className="fa fa-home"></i>
                                <Link to="isotope" href="/#/">Home</Link></li>
                            <li>
                                <i className="fa fa-wrench"></i>
                                <a href="#">About HORU</a></li>
                            <li ng-if="loggedIn">
                                <i className="fa fa-users"></i>
                                <Link to="account" href="/#/account">Your Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
});
