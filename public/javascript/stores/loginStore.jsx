import alt from '../alt';
import loginActions from '../actions/loginActions';
import sessionActions from '../actions/sessionActions';

class loginStore {

    constructor() {

        this.showModal = false;

        this._resetState();

        this._createFormObjects();

        this.on('beforeEach', () => {
            this.apiCallInProgress = false;
            this.passwordresetError = false;
        });

        this.on('bootstrap', this._createFormObjects);

        this.bindActions(loginActions);

        this.bindListeners({
            authenticateResponse: sessionActions.authenticateResponse
        });

    }

    _resetState() {
        this.showForgotPasswordForm = false;
        this.showResetPasswordForm = false;
        this.showLoginForm = true;

        this.loginFormIsValid = false;
        this.forgottenPasswordIsValid = false;
        this.resetPasswordFormIsValid = false;

        this.forgottenPasswordSuccess = false;
        this.passwordresetSuccess = false;
    }

    _createFormObjects() {
        this.loginForm = {
            username: {validity: 'You have not supplied a username'},
            password: {validity: 'You have not supplied a password'}
        };

        this.forgottenPasswordForm = {
            email : {validity: 'You have not supplied an email'}
        };

        this.resetPasswordForm = {
            password : {validity: 'You must enter a password'},
            confirmPassword : {validity: 'You must confirm your password'}
        };
    }

    authenticateResponse() {
        this.showModal = false;
    }

    forgotPasswordClicked() {
        this.showForgotPasswordForm = true;
        this.showLoginForm = false;
    }

    submitForgottenPassword() {
        this.apiCallInProgress = true;
    }

    submitForgottenPasswordSuccess() {
        this.apiCallInProgress = false;
        this.forgottenPasswordSuccess = true;
    }

    submitPasswordReset() {
        this.apiCallInProgress = true;
    }

    submitPasswordResetSuccess() {
        this.apiCallInProgress = false;
        this.passwordresetSuccess = true;
    }

    submitPasswordResetError(res) {
        this.apiCallInProgress = false;
        this.passwordresetError = res.body.error;
    }

    triggerModal(state) {
        if (state === true) {
            this._resetState();
        }
        this.showModal = state;
    }

    forgottenPasswordEmailInputTrigger(e) {
        this.forgottenPasswordForm.email.value = e.target.value;
        this.forgottenPasswordIsValid = loginStore.checkForgottenPasswordFormValidity(this.forgottenPasswordForm);
    }

    usernameInputTrigger(e) {
        this.loginForm.username.value = e.target.value;
        this.loginFormIsValid = loginStore.checkLoginFormValidity(this.loginForm);
    }

    passwordInputTrigger(e) {
        this.loginForm.password.value = e.target.value;
        this.loginFormIsValid = loginStore.checkLoginFormValidity(this.loginForm);
    }

    resetPasswordInputTrigger(e) {
        this.resetPasswordForm.password.value = e.target.value;
        this.resetPasswordFormIsValid = loginStore.resetPasswordFormValidity(this.resetPasswordForm);
    }

    resetPasswordConfirmInputTrigger(e) {
        this.resetPasswordForm.confirmPassword.value = e.target.value;
        this.resetPasswordFormIsValid = loginStore.resetPasswordFormValidity(this.resetPasswordForm);
    }

    static resetPasswordFormValidity(form) {
        form.password.validity = '';
        form.confirmPassword.validity = '';

        if (!form.password.value) {
            form.password.validity = 'You must enter a password';
        }

        if (!form.confirmPassword.value) {
            form.confirmPassword.validity = 'You must enter a confirmed password';
        }

        if (form.password.value !== form.confirmPassword.value) {
            form.password.validity = 'Your passwords do not match';
            form.confirmPassword.validity = 'Your passwords to not match';
        }

        if (form.password.validity || form.confirmPassword.validity) {
            return false;
        }

        return true;

    }

    static checkLoginFormValidity(loginForm) {

        loginForm.username.validity = !loginForm.username.value ? 'You have not supplied a username' : '';
        loginForm.password.validity = !loginForm.password.value ? 'You have not supplied a password' : '';

        if (loginForm.username.value && loginForm.password.value) {
            return true;
        }


        return false;
    }

    static checkForgottenPasswordFormValidity(form) {
        if (form.email.value) {
            form.email.validity = '';
            return true;
        }

        form.email.validity = 'You have not supplied a email';

        return false;
    }

}


export default alt.createStore(loginStore, 'loginStore');
