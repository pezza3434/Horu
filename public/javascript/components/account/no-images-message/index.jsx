if (typeof window !== "undefined") {
    require('./style.scss');
}

import React from 'react';

module.exports = React.createClass({
    render() {
        return (
            <div className="col-md-12 no-images-message-container fill">
                <div className="no-images-message">
                    <h1><i className="fa fa-file-image-o"></i></h1>
                    <h1>You should upload your first photo!</h1>
                </div>
            </div>
        )
    }
});
