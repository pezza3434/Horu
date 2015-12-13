if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import cn from 'classnames';

import RegisterButton from '../register-button';

export default React.createClass({
    _clickClose() {
        this.props.toggleWelcomeMessage(false);
    },
    render() {
        return (
            <div className={cn('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 content welcome-message', {closed: !this.props.open})}>
                <span className="welcome-message__icon"><i onClick={this._clickClose} className="fa fa-times"></i></span>
                <h1>Find out exactly how old you look.</h1>
                <p>Simply upload one or multiple photos of yourself and others can vote on how old they think you look.</p>
               <p className="feeling-brave">Feeling Brave?</p>
                 <RegisterButton buttonClassName="btn btn-lg btn-default" buttonText="Get Started"/>
            </div>
        );
    }
});
