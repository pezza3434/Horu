if (typeof window !== 'undefined') {
    require('./style.scss');
}

var React = require('react');

export default React.createClass({
    render() {
        return (
            <div className="col-md-12 account__header">
                <div className="account__header__text">Your Account</div>
            </div>
        );
    }
});
