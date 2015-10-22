if (typeof window !== "undefined") {
    require('./style.scss');
}

import React from 'react';

import isotopeActions from '../../actions/isotopeActions';

import isotopeStore from '../../stores/isotopeStore';
import configurationStore from '../../stores/configurationStore';

import Face from './face';

module.exports = React.createClass({
    propTypes: {
        serverUrl: React.PropTypes.string,
        isotopeImages: React.PropTypes.array
    },
    _renderFaces() {
        return this.props.isotopeImages.map((face, index) => {
            return <Face
                key={index}
                serverUrl={this.props.serverUrl}
                id={face.id}
                path={face.path}
                userId={face.user_id}
                rated={face.rated}
                age={face.age}>
            </Face>
        });
    },
    render() {
        var faces;
        if (this.props.isotopeImages.length > 0) {
            faces = this._renderFaces();
        } else {
            faces = '';
        }

        return <div className="col-sm-10 col-sm-offset-2 content no-padding">
            {faces}
        </div>

    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._isotopeStoreChange);
    },
});
