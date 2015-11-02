if (typeof window !== 'undefined') {
    require('./style.scss');
}

var React = require('react');
var classNames = require('classnames');
var sessionActions = require('../../actions/sessionActions');
var sessionStore = require('../../stores/sessionStore');

var Modal = require('react-bootstrap').Modal;

export default React.createClass({
    getInitialState() {
        return {
            showModal: false,
            validated: false
        };
    },
    componentDidMount() {
        sessionStore.listen(this._sessionStoreChange);
    },
    _sessionStoreChange(storeState) {
        var state = {};

        if(storeState.apiCallInProgress) {
            state.apiCallInProgress = true;
        } else {
            state.apiCallInProgress = false;
        }

        if (storeState.successfulRegistration) {
            state.successfulRegistration = true;
            state.showModal = false;
        }

        if (storeState.registrationError) {
            state.registrationError = true;
        }

        this.setState(state);
    },
    _openModal() {
        this.setState({
            showModal: true
        });
    },
    _closeModal() {
        this.setState({
            showModal: false
        });
    },
    _getFieldDOMNodes() {
        return {
            email: this.refs.email.getDOMNode().value,
            username: this.refs.username.getDOMNode().value,
            password: this.refs.password.getDOMNode().value,
            confirmPassword: this.refs.confirmPassword.getDOMNode().value,
            age: this.refs.age.getDOMNode().value
        };
    },
    _formOnChange() {
        var {
            email,
            username,
            password,
            confirmPassword,
            age
        } = this._getFieldDOMNodes();

        if (email && username && age && password && confirmPassword && password === confirmPassword) {
            this.setState({
                validated: true
            });
        } else {
            this.setState({
                validated: false
            });
        }
    },
    _formValidation(e) {
        e.preventDefault();

        let {
            email,
            username,
            password,
            confirmPassword,
            age
        } = this._getFieldDOMNodes();

        let state = {};

        Object.keys(this._getFieldDOMNodes()).forEach(field => {
            if (!this._getFieldDOMNodes()[field]) {
                state[field + 'Error'] = true;
            }
        });

        if (password !== confirmPassword) {
            state.passwordMismatch = true;
        }

        if (Object.keys(state).length) {
            return this.setState(state);
        }

        var registrationData = {
            email: email,
            username: username,
            password: password,
            age
        };

        sessionActions.postUser(registrationData);

        return this.setState({
            validated: true
        });
    },
    render() {

        var submitClasses = classNames('btn', 'btn-default', {
            disabled: !this.state.validated || this.state.apiCallInProgress
        });

        return (
            <div>
                <div className="register-button" onClick={this._openModal}> Register</div>
                <Modal onHide={this._closeModal} show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register to How Old Are you Really</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form name="registerForm">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                {this.state.emailError ? <span className="error-message">Invalid Email.</span> : ''}
                                <input className="form-control" id="form-email" name="email" onChange={this._formOnChange} placeholder="Enter email" ref="email" type="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                {this.state.usernameError ? <span className="error-message">Your username is required.</span>: ''}
                                <input className="form-control" id="form-username" name="username" onChange={this._formOnChange} placeholder="Enter username" ref="username" type="text"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">How old are you? (We use this to tell people how accurate their guesses were)</label>
                                {this.state.ageError ? <span className="error-message">Your real age is required</span>: ''}
                                <input className="form-control" id="form-username" name="username" onChange={this._formOnChange} placeholder="Enter your age" ref="age" type="text"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                {this.state.passwordError? <span className="error-message">Your password is required.</span>: ''}
                                <input className="form-control" id="form-password" name="password" onChange={this._formOnChange} placeholder="Password" ref="password" type="password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                {this.state.confirmPasswordError? <span className="error-message">You haven't confirmed your password</span>: '' }
                            <input ref="confirmPassword" onChange={this._formOnChange}name = "confirm-password" className = "form-control" id = "form-confirm-password" placeholder = "Confirm Password" type = "password" /> </div>
                            <button className={submitClasses} type="submit" onClick={this._formValidation}> {this.state.apiCallInProgress ? 'Loading...' : 'Submit'} </button>{this.state.registrationError ? <span className="error-message">There was a problem processing your details</span > : '' } {this.state.successfulRegistration ? <span className="success-message">You're account has been added!</span> : '' }
                            </form>
                        </Modal.Body >
                        <Modal.Footer>
                            <button className="btn btn-default" onClick={this._closeModal} type="button">Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
    }
});
