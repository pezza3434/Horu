if (typeof window !== "undefined") {
    require('./style.scss');
    var Cropper = require('react-cropper');
}

import React from 'react';
import IndividualRating from './individual-rating';

export default React.createClass({
    _crop (data) {
    },
    render() {
        let Ratings = this.props.ratings.map(rating => <IndividualRating rating={rating} />);
        return (
            <div className="col-md-12 account__uploads">
                {Ratings}
            </div>
        );
    }
});
