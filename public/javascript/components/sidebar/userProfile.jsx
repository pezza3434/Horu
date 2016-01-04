var React = require('react');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;

export default React.createClass({
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
                            <DropdownButton id="10" className="user-dropdown"  title={this.props.user.username} onSelect={this.props.sidebarClickedAction}>
                              <MenuItem eventKey="1">Your dashboard</MenuItem>
                              <MenuItem divider />
                              <MenuItem eventKey="2">Settings</MenuItem>
                              <MenuItem eventKey="3">Logout</MenuItem>
                            </DropdownButton>
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
