var React = require('react');
var isotopeActions = require('../../actions/isotopeActions');
var isotopeStore = require('../../stores/isotopeStore');

if (typeof window !== "undefined") {
    require('./style.scss');
}

module.exports = React.createClass({
    render() {
        return (
            <div className="col-sm-2 sidebar no-padding">
                    <div className="sidebar__logo">
                        <div className="sidebar__logo__text">HORU</div>
                    </div>
                    <div className="col-sm-12 no-padding user-info">
                        <div className="user-info__login">
                            <span className="user-info__login"><a data-toggle="modal" data-target="#login-modal">Login |</a></span>
                            <span className="user-info__register"><a data-toggle="modal" data-target="#register-modal">Sign-up</a></span>
                        </div>
                        <div className="logged-in">
                            <div className="logged-in__container">
                                <div className="logged-in__profile-image">
                                </div>
                                <div className="logged-in__profile-text">
                                    <div className="logged-in__profile-username">
                                        Pezza3434
                                    </div>
                                    <div className="logged-in__profile-votes">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 navigation no-padding">
                        <ul>
                            <li>
                                <i className="fa fa-home"></i>
                                <a href="/#/">Home</a></li>
                            <li>
                                <i className="fa fa-wrench"></i>
                                <a href="#">About HORU</a></li>
                            <li ng-if="loggedIn">
                                <i className="fa fa-users"></i>
                                <a href="/#/account">Your Account</a>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
});
