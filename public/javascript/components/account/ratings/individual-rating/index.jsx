if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import DeleteImage from '../../delete-image';

export default React.createClass({
    componentDidMount() {
        twttr.widgets.load();
    },
    shareFb() {
        FB.ui({
            method: 'feed',
            link: 'http://horu.io',
            description: 'My picture has been rated by hundreds of people and I look ' + Math.floor(this.props.rating.current_rating) + '. Horu is the online platform for finding out how old you look. Get started today!',
            caption: 'http://horu.io',
            name: 'I look ' + Math.floor(this.props.rating.current_rating) + '!',
            picture: this.props.serverUrl + '/static' + this.props.rating.image_thumbnail
        }, function(){});
    },
    render() {
        let thumbnailUrl = this.props.serverUrl + '/static/thumbnails' + this.props.rating.image_thumbnail;
        return (
            <div className="account__uploads__container col-md-6">
                <div className="col-xs-4 account__uploads__image">
                    <img src={thumbnailUrl} />
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
                    <div className="social-icons">
                        <div className="twitter"><a className="twitter-share-button-custom" href={'https://twitter.com/intent/tweet?text=I%20look%20' + Math.floor(this.props.rating.current_rating) + '%21.%20How%20old%20do%20you%20look%3F&url=http://horu.io&via=thehoruapp'}><i className="fa fa-twitter"></i></a></div>
                        <div className="facebook"><a href="#" onClick={this.shareFb}><i className="fa fa-facebook"></i></a></div>
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
