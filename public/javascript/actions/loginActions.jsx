var alt = require('../alt');
var request = require('superagent');
var configurationStore = require('../stores/configurationStore');

var loginActions = {
    forgotPasswordClicked() {
        this.dispatch();
    },
    submitForgottenPassword(email) {
        request
        .get(`${configurationStore.getServerUrl()}/passwordreset?email=${encodeURIComponent(email)}`)
        .end((err,res) => {
            if (!err){
                this.actions.submitForgottenPasswordSuccess(res);
            }
        });
        this.dispatch();
    },
    submitForgottenPasswordSuccess() {
        this.dispatch();
    },
    submitPasswordReset(newPassword) {
        request
        .post(`${configurationStore.getServerUrl()}/passwordreset`)
        .send({email: window.queryParameters.email, resetToken: window.queryParameters.token, newPassword: newPassword})
        .end((err,res) => {
            if (!err){
                return this.actions.submitPasswordResetSuccess(res);
            }

            return this.actions.submitPasswordResetError(res);
        });

        this.dispatch();
    },

    submitPasswordResetSuccess() {
        this.dispatch();
    },

    submitPasswordResetError(res) {
        this.dispatch(res);
    },

    triggerModal(state) {
        this.dispatch(state);
    },

    forgottenPasswordEmailInputTrigger(e) {
        this.dispatch(e);
    },

    usernameInputTrigger(e) {
        this.dispatch(e);
    },

    passwordInputTrigger(e) {
        this.dispatch(e);
    },

    resetPasswordInputTrigger(e) {
        this.dispatch(e);
    },

    resetPasswordConfirmInputTrigger(e) {
        this.dispatch(e);
    }
};

export default alt.createActions(loginActions);
