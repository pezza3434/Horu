import React from 'react';
import Register from '../register-button';

export default React.createClass({
    render() {
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 content no-padding">
                <div className="no-images-message">
                    <h1><i className="fa fa-file-image-o" data-reactid=".13ume45kydc.0.1.0.3.0.0.0"></i></h1>
                    <h3>It looks like you've already rated all the images currently uploaded.</h3>
                    {!this.props.isLoggedIn ?
                    <div>
                        <h3>Get started and find out how old <strong>you</strong> look.</h3>
                        <Register/>
                    </div>
                    : ''}
                </div>
            </div>
        );
    }
});
