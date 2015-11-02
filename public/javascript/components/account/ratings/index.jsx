if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
import IndividualRating from './individual-rating';

export default React.createClass({
    render() {
        let Ratings = this.props.ratings.map((rating, index) => <IndividualRating serverUrl={this.props.serverUrl} rating={rating} triggerDeleteModal={this.props.triggerDeleteModal} key={index}/>);
        return (
            <div className="col-md-12 account__uploads">
                {Ratings}
            </div>
        );
    }
});
