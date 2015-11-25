if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import RegisterButton from '../register-button';

export default React.createClass({
    render() {
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 content sign-up-message">
                <h1>Upload your own photo</h1>
                <p>You've spent some time figuring out how old other people look. Now find out how old you look! You
                    might be pleasently surprised by the results.
                </p>
                 <RegisterButton buttonClassName="btn btn-lg btn-default" buttonText="Get Started"/>
            </div>
        );
    }
});
