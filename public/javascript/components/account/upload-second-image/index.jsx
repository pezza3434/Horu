if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react'; //eslint-disable-line

const component = (props) => (
    <div className="account__uploads__container col-md-6">
        <div className="col-xs-4 account__uploads__image">
            <img src={props.imageUrl} />
        </div>
        <div className="col-xs-8 account__uploads__message">
            <div>
                <strong>Got a second image?</strong>
            </div>
            <div className="account__uploads__message__invite">
                What about that one with the different haircut, or that time when you grew a beard?
                You'll be amazed what the results can be for different images.
            </div>
            <button onClick={props.openUploadModalAction} className="btn btn-default upload-second-image">Upload second image</button>
        </div>
    </div>
);

export default component;
