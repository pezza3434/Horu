if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import IndividualRating from './individual-rating';
import UploadSecondImageMessage from '../upload-second-image';

export default React.createClass({
    render() {
        let Ratings = this.props.ratings.map((rating, index) => <IndividualRating serverUrl={this.props.serverUrl} rating={rating} triggerDeleteModal={this.props.triggerDeleteModal} key={index}/>);
        if (Ratings.length === 1) {
            Ratings.push(<UploadSecondImageMessage openUploadModalAction={this.props.openUploadModalAction} key={1234} imageUrl={this.props.serverUrl + '/static/placeholder.jpg'}/>);
        }
        return (
            <div className="col-md-12 account__uploads">
                {Ratings}
            </div>
        );
    }
});
