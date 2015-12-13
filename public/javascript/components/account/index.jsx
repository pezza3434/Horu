import React from 'react';

import Header from './header/index';
import Upload from './image-upload/index';
import Ratings from './ratings';
import DeleteRatingModal from './delete-rating-modal';
import NoImagesMessage from './no-images-message';

import ratingsActions from '../../actions/ratingsActions';
import imagesActions from '../../actions/imagesActions';
import uploadActions from '../../actions/uploadActions';

import ratingsStore from '../../stores/ratingsStore';
import imagesStore from '../../stores/imagesStore';
import configurationStore from '../../stores/configurationStore';

export default React.createClass({
    componentWillMount() {
        this.setState(ratingsStore.getState());
        this.setState({serverUrl: configurationStore.getServerUrl()});
    },
    componentDidMount() {
        ratingsActions.getRatings();
        ratingsStore.listen(this._ratingsStoreChange);
        imagesStore.listen(this._imagesStoreChange);
    },
    _ratingsStoreChange(storeState) {
        this.setState(storeState);
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
        setTimeout(() => ratingsActions.toggleModal({showModal:false}), 1000);
    },

    render() {
        var {ratings} = this.state;
        return (
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 content no-padding fill">
                <div className="account fill">
                    <Header/>
                    <Upload/>
                    {ratings && ratings.length > 0 ? <Ratings openUploadModalAction={uploadActions.triggerModalOpen} serverUrl={this.state.serverUrl} ratings={ratings} triggerDeleteModal={this._triggerDeleteModal}/> : ''}
                    {ratings && ratings.length === 0 && !this.state.apiCallInProgress ? <NoImagesMessage/> : ''}
                    <DeleteRatingModal showModal={this.state.showModal}
                        idToDelete={this.state.idToDelete}
                        cancelModalAction={this._triggerCancelImageDelete}
                        deleteImageAction={this._triggerImageDelete}
                        imageDeleteSuccessful={this.state.imageDeleteSuccessful}
                        />
                </div>
            </div>
        );
    },

    componentWillUnmount() {
        ratingsStore.unlisten(this._ratingsStoreChange);
        imagesStore.unlisten(this._imagesStoreChange);
    }
});
