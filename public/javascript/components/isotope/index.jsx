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
        return <Isotope
            serverUrl = {this.state.serverUrl}
            isotopeImages = {this.state.isotopeImages}
            />
        
    }
});
