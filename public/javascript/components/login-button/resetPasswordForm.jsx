import React from 'react';
import classNames from 'classnames';

export default React.createClass({

    componentWillMount() {
        this.setState({showValidation:false});
    },

    _submitClick(e) {
        e.preventDefault();
        if (this.props.isValid) {
            this.props.submitPasswordResetAction(e, this.refs.rppasswordconfirm.value);
        } else {
            this.setState({showValidation:true});
        }
    },

    render() {

        let submitClasses = classNames('btn', 'btn-default', {disabled: !this.props.isValid || this.props.apiCallInProgress});
        return (
            <div>
                {this.props.passwordresetSuccess ?
                    <div>
                        <p>Your password has been reset. Please now login with your new credentials</p>
                    </div>
                    :
                    <form name="resetPasswordForm">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Choose a new password:</label>
                            <input onChange={this.props.resetPasswordInputTrigger} ref="rppassword" className="form-control" id="exampleInputEmail1" name="rppassword" placeholder="Enter password" type="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Confirm your new password:</label>
                            <input onChange={this.props.resetPasswordConfirmInputTrigger} ref="rppasswordconfirm" className="form-control" id="exampleInputEmail1" name="rppasswordconfim" placeholder="Confirm password" type="password" />
                        </div>
                        <button onClick={this._submitClick} className={submitClasses}>{this.props.apiCallInProgress ? 'Loading...' : 'Submit'}</button>
                    </form>
                }
                {this.props.passwordResetError ?
                    <div>
                        <p>{this.props.passwordResetError}</p>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }

});
