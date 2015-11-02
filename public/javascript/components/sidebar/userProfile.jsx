var React = require('react');
import {Link} from 'react-router';

module.exports = React.createClass({
    render() {

        var imageSource = this.props.serverUrl + '/static' + this.props.user.profilePicture;

        return (
            <div className="logged-in">
                <div className="logged-in__container">
                    <div className="logged-in__profile-image">
                        <img src={imageSource} />
                    </div>
                    <div className="logged-in__profile-text">
                        <div className="logged-in__profile-username">
                            <Link to="account" href="/#/account">{this.props.user.username}</Link>
                        </div>
                        <div className="logged-in__profile-votes">
                            {this.props.user.votes} votes
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});