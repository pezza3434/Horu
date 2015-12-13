if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import Ratings from '../ratings';
import NoImagesMessage from '../no-images-message';
import LoadingIcon from '../../../utils/loading-icon';

const Component = React.createClass({
    render() {
        let {ratings} = this.props;
        return (
            <div className="col-md-12 ratings-container">
                <div className="ratings-container__loading-update">
                    {ratings && this.props.apiCallInProgress ? <LoadingIcon/> : ''}
                </div>
                {!ratings && this.props.apiCallInProgress ? <div className="ratings-container__loading"><LoadingIcon/></div> : ''}
                {ratings && ratings.length > 0 ? <Ratings openUploadModalAction={this.props.openUploadModalAction} serverUrl={this.props.serverUrl} ratings={this.props.ratings} triggerDeleteModal={this.props.triggerDeleteModal}/> : ''}
                {ratings && ratings.length === 0 && !this.props.apiCallInProgress ? <NoImagesMessage/> : ''}
            </div>
        );
    }
});

export default Component;
