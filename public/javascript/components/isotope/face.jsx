import React from 'react';
import classNames from 'classnames';

import isotopeActions from '../../actions/isotopeActions';

import ResultsForm from './resultsForm';
import Form from './form';

module.exports = React.createClass({
    _clickedContainer() {
        this.props.clickedFaceHandler();
    },
    render() {
        var url = this.props.serverUrl + '/static' + this.props.path;

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
            {hide: !this.props.displayForm && !this.props.formSubmitted}
        );

        return (
            <div className={containerClassNames}
                onClick={this._clickedContainer}
                onMouseLeave={this.props.mouseLeftContainerHandler}
                onMouseEnter={this.props.mouseEnteredContainerHandler}>
                <img className="grid-item__image img-responsive" src={url} />
                <div className={boxClassNames}>
                    <div className="grid-item__text__input">
                        {this.props.displayForm && !this.props.formSubmitted ?
                            <Form formSubmittedHandler={this.props.formSubmittedHandler} faceId={this.props.id} containerClicked={this.props.containerClicked} /> : ''
                        }
                    </div>
                    <ResultsForm ageGuessed = {this.props.ageGuessed} age = {this.props.age}/>
                </div>
            </div>
        )
    }
});
