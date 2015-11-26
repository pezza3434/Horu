if (typeof window !== 'undefined') {
    require('./style.scss');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var sessionActions = require('../../actions/sessionActions');
var sessionStore = require('../../stores/sessionStore');

import loginStore from '../../stores/loginStore';

import loginActions from '../../actions/loginActions';

import ForgotPasswordForm from './forgotPasswordForm';
import LoginForm from './loginForm';
import ResetPasswordForm from './resetPasswordForm';

export default React.createClass({
    componentWillMount() {
        this.setState(sessionStore.getState());
        this.setState(loginStore.getState());
    },
    componentDidMount() {
        sessionStore.listen(this._sessionStoreChange);
        loginStore.listen(this._loginStoreChange);
    },
    _loginStoreChange(storeState) {
        this.setState(storeState);
    },
    _sessionStoreChange(response) {
        this.setState(response);
    },
    _submitForgotPasswordEmail(e, email) {
        e.preventDefault();
        loginActions.submitForgottenPassword(email);
    },
    _submitPasswordReset(e, newPassword) {
        e.preventDefault();
        loginActions.submitPasswordReset(newPassword);
    },
    _loginFormSubmitAction(e) {
        e.preventDefault();
        let data = {
            username: this.state.loginForm.username.value,
            password: this.state.loginForm.password.value
        };
        sessionActions.authenticate(data);
    },
    _openModal() {
        loginActions.triggerModal(true);
    },
    _closeModal() {
        loginActions.triggerModal(false);
    },
    render() {
        return(
            <div>
                <div className="login-button" onClick={this._openModal}>Log in</div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login to HORU</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.showForgotPasswordForm ?
                             <ForgotPasswordForm
                                 submitForgottenPasswordAction={this._submitForgotPasswordEmail}
                                 forgottenPasswordEmailInputTriggerAction={loginActions.forgottenPasswordEmailInputTrigger}
                                 forgottenPasswordForm={this.state.forgottenPasswordForm}
                                 isValid={this.state.forgottenPasswordIsValid}
                                 apiCallInProgress={this.state.apiCallInProgress}
                                 forgottenPasswordSuccess={this.state.forgottenPasswordSuccess}
                                 />
                         : ''}
                         {this.state.showLoginForm ?
                            <LoginForm
                                usernameOnChangeAction={loginActions.usernameInputTrigger}
                                passwordOnChangeAction={loginActions.passwordInputTrigger}
                                isValid={this.state.loginFormIsValid}
                                apiCallInProgress={this.state.apiCallInProgress}
                                isError={this.state.isAuthenticationError}
                                loginFormSubmitAction={this._loginFormSubmitAction}
                                loginForm={this.state.loginForm}
                                forgotPasswordClickedAction={loginActions.forgotPasswordClicked}
                                 />
                        : '' }

                        {this.state.showResetPasswordForm ?
                            <ResetPasswordForm
                                apiCallInProgress={this.state.apiCallInProgress}
                                resetPasswordForm={this.state.resetPasswordForm}
                                isValid={this.state.resetPasswordFormIsValid}
                                submitPasswordResetAction={this._submitPasswordReset}
                                passwordresetSuccess = {this.state.passwordresetSuccess}
                                resetPasswordInputTrigger = {loginActions.resetPasswordInputTrigger}
                                resetPasswordConfirmInputTrigger = {loginActions.resetPasswordConfirmInputTrigger}
                                passwordResetError = {this.state.passwordresetError}
                            />
                        : ''}

                    </Modal.Body>
                </Modal>
            </div>
        );
    },
    componentWillUnmount() {
        sessionStore.unlisten(this._sessionStoreChange);
        loginStore.unlisten(this._loginStoreChange);
    }
});
