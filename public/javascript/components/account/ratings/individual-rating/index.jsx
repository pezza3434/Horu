import React from 'react';

export default React.createClass({
    _deleteImage() {
        this.props.triggerDeleteModal(this.props.rating.image_id);
    },
    render() {
        var url = "http://generation.com:3000/static/thumbnails" + this.props.rating.image_thumbnail;
        return (
            <div className="account__uploads__container col-md-6">
                <div className="col-md-4 account__uploads__image">
                    <img src={url} />
                </div>
                <div className="col-md-8 account__uploads_stats">
                    <div>
                        <strong>Current Rating: </strong>
                        {this.props.rating.current_rating}
                    </div>
                    <div>
                        <strong>Number of Votes: </strong>
                        {this.props.rating.votes}
                    </div>
                    <div className="account_uploads_stats__delete">
                        <span onClick={this._deleteImage}>
                            <i className="fa fa-trash"></i>
                            Delete Image
                        </span>
                    </div>
                </div>
            </div>
        )
    }
});
