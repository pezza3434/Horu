var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ModalHeader = require('react-bootstrap').ModalHeader;
var ModalBody = require('react-bootstrap').ModalBody;
var ModalFooter =  require('react-bootstrap').ModalFooter;
var classNames = require('classnames');
var sessionActions = require('../../actions/sessionActions');
var sessionStore = require('../../stores/sessionStore');

module.exports = React.createClass({
    componentDidMount() {
        sessionStore.listen(this._onStoreChange);
    },
    getInitialState() {
        return {showModal: false, validated:false};
    },
    _onStoreChange(response) {
        if (response.isLoggedIn) {
            this.setState({showModal:false});
        }
    },
    _validate(e) {
        e.preventDefault();
        var username = this.refs.username.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;

        var authenticationData = {
            username: username,
            password: password
        }

        sessionActions.authenticate(authenticationData);

    },
    _openModal() {
        this.setState({ showModal: true });
    },
    _closeModal() {
        this.setState({showModal:false});
    },
    render() {

        var submitClasses = classNames('btn', 'btn-default', {disabled: !this.state.validated});

        return(
            <div>
                <div onClick={this._openModal}>Log in</div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login to How Old Are you Really</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form name="loginForm">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label> <span className="error-message"> Your name is required.</span>
                                <input ref="username" className="form-control" id="exampleInputEmail1" name="username" placeholder="Enter username" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label> <span className="error-message"> Your password is required.</span>
                                <input ref="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" />
                            </div>
                            <button className={submitClasses} onClick={this._validate} type="submit">Submit</button>
                            <span className="error-message">There was a problem with your supplied username and password</span>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" type="button">Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
});
