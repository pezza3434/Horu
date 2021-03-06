import React from 'react';
import classNames from 'classnames';

export default React.createClass({

    componentWillMount() {
        this.setState({showValidation:false});
    },

    _submitClick(e) {
        e.preventDefault();
        if (this.props.isValid) {
            this.props.loginFormSubmitAction(e);
        } else {
            this.setState({showValidation:true});
        }
    },

    render() {

        let submitClasses = classNames('btn', 'btn-default', 'full-width-button', 'sign-in', {disabled: !this.props.isValid || this.props.apiCallInProgress});

        return (
            <form name="loginForm" className="loginForm">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>{this.state.showValidation && this.props.loginForm.username.validity ? <span className="error-message-form"> {this.props.loginForm.username.validity}  </span> : ''}
                    <input onChange={this.props.usernameOnChangeAction} ref="username" className="form-control" id="exampleInputEmail1" name="username" placeholder="Enter username" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>{this.state.showValidation && this.props.loginForm.password.validity ? <span className="error-message-form"> {this.props.loginForm.password.validity}  </span> : ''}
                    <input onChange={this.props.passwordOnChangeAction} ref="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" />
                </div>
                <button onClick={this._submitClick} disabled={this.props.apiCallInProgress} className={submitClasses} type="submit">{this.props.apiCallInProgress ? 'Loading...' : 'Sign in'}</button>
                {this.props.isError ? <span className="error-message">There was a problem with your supplied username and password</span> : '' }
                <span className="forgot-password-link" onClick={this.props.forgotPasswordClickedAction}>Forgot your password?</span>

            </form>
        );
    }

});
