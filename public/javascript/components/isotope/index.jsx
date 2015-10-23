import React from 'react';

import Isotope from './isotope';

import isotopeActions from '../../actions/isotopeActions';

import isotopeStore from '../../stores/isotopeStore';
import configurationStore from '../../stores/configurationStore';

module.exports = React.createClass({
    componentWillMount() {
        this.setState({serverUrl: configurationStore.getServerUrl()});
        this.setState(isotopeStore.getState());
        isotopeActions.getImages();
    },
    componentDidMount() {
        isotopeStore.listen(storeState => this.setState(storeState));
    },
    _clickedFaceHandler(faceIndex) {
        isotopeActions.clickedFace(faceIndex);
    },
    _mouseLeftContainerHandler(faceIndex) {
        isotopeActions.mouseLeftContainer(faceIndex);
    },
    _mouseEnteredContainerhandler(faceIndex) {
        isotopeActions.mouseEnteredContainer(faceIndex);
    },
    _formSubmittedHandler(faceIndex, submissionData) {
        isotopeActions.submitAge(submissionData, faceIndex);
    },
    render() {
        return <Isotope
            serverUrl = {this.state.serverUrl}
            isotopeImages = {this.state.isotopeImages}
            clickedFaceHandler = {this._clickedFaceHandler}
            mouseLeftContainerHandler = {this._mouseLeftContainerHandler}
            mouseEnteredContainerHandler = {this._mouseEnteredContainerhandler}
            formSubmittedHandler = {this._formSubmittedHandler}
            isotopeState = {this.state.isotopeState}
            />

    }
});
