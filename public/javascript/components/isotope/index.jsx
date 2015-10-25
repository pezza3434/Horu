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
    render() {
        return(
            <div>
             {this.state.isotopeImages.length > 0 ?
                <Isotope
                    serverUrl = {this.state.serverUrl}
                    isotopeImages = {this.state.isotopeImages}
                    clickedFaceHandler = {isotopeActions.clickedFace}
                    mouseLeftContainerHandler = {isotopeActions.mouseLeftContainer}
                    mouseEnteredContainerHandler = {isotopeActions.mouseEnteredContainer}
                    formSubmittedHandler = {isotopeActions.submitAge}
                    isotopeState = {this.state.isotopeState}
                    />
                : ''}
            </div>
        );

    }




});
