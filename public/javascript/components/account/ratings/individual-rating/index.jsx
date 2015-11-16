import React from 'react';

import DeleteImage from '../../delete-image';

export default React.createClass({
    render() {
        var url = this.props.serverUrl + '/static/thumbnails' + this.props.rating.image_thumbnail;
        return (
            <div className="account__uploads__container col-md-6">
                <div className="col-xs-4 account__uploads__image">
                    <img src={url} />
                </div>
                {this.props.rating.votes > 0 ?
                <div className="col-xs-8 account__uploads_stats">
                    <div>
                        <strong>People think you look: </strong>
                        {Math.floor(this.props.rating.current_rating)}
                    </div>
                    <div>
                        <strong>Number of Votes: </strong>
                        {this.props.rating.votes}
                    </div>
                    <DeleteImage
                        deleteAction={this.props.triggerDeleteModal}
                        imageId={this.props.rating.image_id}
                        />
                </div>
                :
                <div className="col-xs-8 account__uploads__message">
                    <div><strong>Check back soon...</strong></div>
                    <div>Peole are guessing your age.</div>

                    <DeleteImage
                        deleteAction={this.props.triggerDeleteModal}
                        imageId={this.props.rating.image_id}
                        />
                </div>
                }
            </div>
        );
    }
});
