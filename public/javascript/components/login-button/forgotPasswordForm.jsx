import React from 'react';
import classNames from 'classnames';

export default React.createClass({
    componentWillMount() {
        this.setState({showValidation:false});
    },

    _submitClick(e) {
        e.preventDefault();
        if (this.props.isValid) {
            this.props.submitForgottenPasswordAction(e, this.refs.fpemail.getDOMNode().value);
        } else {
            this.setState({showValidation:true});
        }
    },

    render() {
        let submitClasses = classNames('btn', 'btn-default', {disabled: !this.props.isValid || this.props.apiCallInProgress});

        return (
            <div>
                {this.props.forgottenPasswordSuccess ?
                    <div>
                        <p>We have sent a email to you containing a password reset link. Click it to reset your password.</p>
                    </div>
                    :
                    <form name="forgotPasswordForm" className="forgot-password-form">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Your email:</label>
                            {this.state.showValidation ? <span className="error-message-form">{this.props.forgottenPasswordForm.email.validity}</span> : ''}
                            <input
                                onChange={this.props.forgottenPasswordEmailInputTriggerAction}
                                ref="fpemail"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="fpemail"
                                placeholder="Enter email"
                                type="text" />
                        </div>
                        <button onClick={this._submitClick} className={submitClasses}>{this.props.apiCallInProgress ? 'Loading...' : 'Submit'}</button>
                    </form>
                    }
            </div>
        );
    }

});
