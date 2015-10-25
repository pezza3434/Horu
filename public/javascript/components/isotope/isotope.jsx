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
        isotopeImages: React.PropTypes.array,
        clickedFaceHandler: React.PropTypes.func,
        mouseLeftContainerHandler: React.PropTypes.func,
        mouseEnteredContainerHandler: React.PropTypes.func,
        formSubmittedHandler: React.PropTypes.func,
        isotopeState: React.PropTypes.array
    },
    render() {
        var {isotopeState,
            formSubmittedHandler,
            clickedFaceHandler,
            mouseEnteredContainerHandler,
            mouseLeftContainerHandler} = this.props;

        return <div className="col-sm-10 col-sm-offset-2 content no-padding">
            {
                this.props.isotopeImages.map((face, index) => {
                    return <Face
                        key={index}
                        serverUrl={this.props.serverUrl}
                        id={face.id}
                        path={face.path}
                        userId={face.user_id}
                        rated={face.rated}
                        age={face.age}
                        mouseLeftContainerHandler={mouseLeftContainerHandler.bind(null, index)}
                        mouseEnteredContainerHandler={mouseEnteredContainerHandler.bind(null, index)}
                        clickedFaceHandler={clickedFaceHandler.bind(null, index)}
                        formSubmittedHandler={formSubmittedHandler.bind(null, index)}
                        containerClicked={isotopeState[index].containerClicked}
                        displayForm={isotopeState[index].displayForm}
                        formSubmitted={isotopeState[index].formSubmitted}
                        ageGuessed = {isotopeState[index].ageGuessed}
                        secondaryImage = {isotopeState[index].secondaryImage}
                        >
                    </Face>
                })
            }
        </div>

    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._isotopeStoreChange);
    },
});
