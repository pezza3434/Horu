import React from 'react';
import classNames from 'classnames';

import ResultsForm from './resultsForm';
import Form from './form';

export default React.createClass({
    _clickedContainer() {
        this.props.clickedFaceHandler();
    },
    render() {
        var url = this.props.serverUrl + '/static';

        var containerClassNames = classNames(
            'col-xs-12',
            'col-sm-6',
            'col-md-4',
            'grid-item',
            'no-padding',
            {clicked: this.props.containerClicked}
        );

        var boxClassNames = classNames(
            'box',
            {submitted: this.props.formSubmitted},
            {'box-hide': !this.props.displayForm && !this.props.formSubmitted}
        );

        var primaryImageClasses = classNames(
            'grid-item__image',
            'img-responsive',
            {hideimage: this.props.secondaryImage}
        );

        return (
            <div className={containerClassNames}
                onClick={this._clickedContainer}
                onMouseLeave={this.props.mouseLeftContainerHandler}
                onMouseEnter={this.props.mouseEnteredContainerHandler}>
                <img className={primaryImageClasses} src={url + this.props.path} />
                <div className={boxClassNames}>
                    <div className="grid-item__text__input">
                        {!this.props.formSubmitted ?
                            <Form formSubmittedHandler={this.props.formSubmittedHandler}
                                 faceId={this.props.id}
                                 containerClicked={this.props.containerClicked}
                                  /> : ''
                        }
                    </div>
                    <ResultsForm ageGuessed={this.props.ageGuessed}
                         age={this.props.age}
                         refreshFacesHander={this.props.refreshFacesHander}
                         validationError={this.props.validationError}
                         />
                </div>
            </div>
        );
    }
});
