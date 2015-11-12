import React from 'react';

import isotopeStore from '../../stores/isotopeStore';

import Face from './face';

export default React.createClass({
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

        return (
             <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 content no-padding">
                {this.props.isotopeImages.map((face, index) => {
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
                        />;
                })}
            </div>
        );
    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._isotopeStoreChange);
    }
});
