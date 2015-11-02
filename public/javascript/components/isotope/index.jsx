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

export default React.createClass({
    componentWillMount() {
        this.setState({serverUrl: configurationStore.getServerUrl()});
        this.setState(isotopeStore.getState());
    },
    componentDidMount() {
        if (isotopeStore.getState().isotopeImages.length === 0) {
            isotopeActions.getImages();
        }
        isotopeStore.listen(this._isotopeStoreChange);
    },
    _isotopeStoreChange(storeState) {
        this.setState(storeState);
    },
    _clickedFaceHandler(faceIndex) {
        if(isotopeStore.getSubmittedFace().length > 0){
            isotopeActions.populateImageRequest(isotopeStore.imageIdsCurrentlyBeingDisplayed());
        }
        isotopeActions.clickedFace(faceIndex);
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
                    />
                : ''}
                {this.state.error ? <NoImagesError/> : ''}
            </div>
        );

    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._isotopeStoreChange);
    }

});
