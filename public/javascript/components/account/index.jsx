import React from 'react';

import Header from './header/index';
import Upload from './image-upload/index';
import Ratings from './ratings';
import DeleteRatingModal from './delete-rating-modal';
import NoImagesMessage from './no-images-message';

import ratingsActions from '../../actions/ratingsActions';
import imagesActions from '../../actions/imagesActions';

import ratingsStore from '../../stores/ratingsStore';
import imagesStore from '../../stores/imagesStore';
import configurationStore from '../../stores/configurationStore';

module.exports = React.createClass({
    componentDidMount() {
        ratingsActions.getRatings();
        ratingsStore.listen(this._ratingsStoreChange);
        imagesStore.listen(this._imagesStoreChange);
        this.setState({serverUrl: configurationStore.getServerUrl()});
    },
    getInitialState() {
        return {ratings:false};
    },
    _ratingsStoreChange(storeState) {
        if (ratingsStore.hasRatings()){
            this.setState(storeState);
        }
    },
    _imagesStoreChange(storeState) {
        this.setState(storeState);
        if (storeState.imageDeleteSuccessful) {
            this._closeModalAfterSuccess();
        }
    },
    _triggerDeleteModal(idToDelete) {
        imagesActions.toggleModal();
        ratingsActions.toggleModal({showModal:true, idToDelete:idToDelete});
    },
    _triggerImageDelete(id) {
        imagesActions.deleteImage(id);
    },
    _triggerCancelImageDelete() {
        ratingsActions.toggleModal({showModal:false});
    },
    _closeModalAfterSuccess() {
        setTimeout(() => this.setState({showModal:false}), 1000);
    },

    render() {
        return (
            <div className="col-sm-10 col-sm-offset-2 content no-padding fill">
                <div className="account fill">
                    <Header/>
                    <Upload/>
                    {this.state.ratings ? <Ratings serverUrl={this.state.serverUrl} ratings={this.state.ratings} triggerDeleteModal={this._triggerDeleteModal}/> : <NoImagesMessage/>}
                    <DeleteRatingModal showModal={this.state.showModal}
                        idToDelete={this.state.idToDelete}
                        cancelModalAction={this._triggerCancelImageDelete}
                        deleteImageAction={this._triggerImageDelete}
                        imageDeleteSuccessful={this.state.imageDeleteSuccessful}
                        />
                </div>
            </div>
        )
    },

    componentWillUnmount() {
        ratingsStore.unlisten(this._ratingsStoreChange);
        imagesStore.unlisten(this._imagesStoreChange);
    },
});
