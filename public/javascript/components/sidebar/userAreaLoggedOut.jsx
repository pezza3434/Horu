import React from 'react';

import LoginButton from '../login-button/index';
import RegisterButton from '../register-button/index';

export default React.createClass({
    render() {
        return(
            <div>
                <div className="col-sm-12 user-info">
                    <div className="navigation__center">
                        <div className='user-info__login'>
                            <div className="user-info__register"><RegisterButton /></div>
                            <div className="user-info__login"><LoginButton /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
