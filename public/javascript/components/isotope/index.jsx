if (typeof window !== 'undefined') {
    require('./style.scss');
    require('./form.scss');
}

import React from 'react';
import NoImagesError from './noImagesError';

import Isotope from './isotope';

import isotopeActions from '../../actions/isotopeActions';

import isotopeStore from '../../stores/isotopeStore';
import configurationStore from '../../stores/configurationStore';
import sessionStore from '../../stores/sessionStore';

export default React.createClass({
    componentWillMount() {
        this.setState({serverUrl: configurationStore.getServerUrl()});
        this.setState(isotopeStore.getState());
        this.setState(sessionStore.getState());
    },
    componentDidMount() {
        isotopeStore.listen(this._isotopeStoreChange);
        sessionStore.listen(this._sessionStoreChange);

        if (isotopeStore.getState().isotopeImages.length === 0) {
            isotopeActions.getImages(isotopeStore.imageIdsCurrentlyBeingDisplayed());
        }
    },
    _isotopeStoreChange(storeState) {
        this.setState(storeState);
    },
    _sessionStoreChange(storeState) {
        this.setState(storeState)
    },
    _clickedFaceHandler(faceIndex) {
        isotopeActions.clickedFace(faceIndex);
    },
    _refreshFacesHandler() {
        isotopeActions.refreshImages(isotopeStore.imageIdsCurrentlyBeingDisplayed());
    },
    render() {
        return(
            <div>
             {this.state.isotopeImages.length > 0 && !this.state.error ?
                <Isotope
                    serverUrl = {this.state.serverUrl}
                    isotopeImages = {this.state.isotopeImages}
                    clickedFaceHandler = {this._clickedFaceHandler}
                    mouseLeftContainerHandler = {isotopeActions.mouseLeftContainer}
                    mouseEnteredContainerHandler = {isotopeActions.mouseEnteredContainer}
                    formSubmittedHandler = {isotopeActions.submitAge}
                    isotopeState = {this.state.isotopeState}
                    refreshFacesHander = {this._refreshFacesHandler}
                    />
                : ''}
                {this.state.error ? <NoImagesError isLoggedIn={this.state.isLoggedIn}/> : ''}
            </div>
        );

    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._isotopeStoreChange);
    }

});
