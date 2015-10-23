import React from 'react';
import classNames from 'classnames';

import isotopeActions from '../../actions/isotopeActions';

module.exports = React.createClass({
    _clickedContainer() {
        this.props.clickedFaceHandler();
        React.findDOMNode(this.refs.faceInput).focus();
    },
    _onMouseLeave() {
        this.props.mouseLeftContainerHandler();
    },
    _onMouseEnter() {
        this.props.mouseEnteredContainerHandler();
    },
    _onFormSubmit(e) {
        e.preventDefault();
        var ageGuessed = this.refs.faceInput.getDOMNode().value;
        var submissionData = {
            imageRatedId: this.props.id,
            rating: ageGuessed
        }
        this.props.formSubmittedHandler(submissionData);

    },
    _formJSX() {
        if (this.props.displayForm && !this.props.formSubmitted) {
            return (
                <form onSubmit={this._onFormSubmit} ref="faceForm">
                         <div className="box__container">
                             <input ref="faceInput" className="" id="input-1" maxLength="2" type="text" autoComplete="off"/>
                             <label className="" htmlFor="input-1">
                                 <span className="">How old am I?</span>
                             </label>
                        </div>
                </form>
            );
        }
    },
    _resultsJSX() {
        if(this.props.formSubmitted) {
            return (
                <div className="box__container-guess">
                    <div className="box__container-guess__guess">You guessed:</div>
                    <div className="box__container-guess__guess-number">{this.props.ageGuessed}</div>
                    <div className="box__container-guess__real-age">Real Age:</div>
                    <div className="box__container-guess__real-age-number">{this.props.age}</div>
                </div>
            );
        }
    },
    render() {
        var url = this.props.serverUrl + '/static' + this.props.path;
        var containerClassNames = classNames('col-xs-12', 'col-sm-6', 'col-md-4', 'grid-item', 'no-padding', {clicked: this.props.containerClicked});
        var boxClassNames = classNames('box', {submitted: this.props.formSubmitted}, {hide: !this.props.displayForm && !this.props.formSubmitted});
        return (
            <div className={containerClassNames} onClick={this._clickedContainer} onMouseLeave={this._onMouseLeave} onMouseEnter={this._onMouseEnter}>
                <img className="grid-item__image img-responsive" src={url} />
                <div className={boxClassNames}>
                    <div className="grid-item__text__input">
                        {this._formJSX()}
                    </div>
                    {this._resultsJSX()}
                </div>
            </div>
        )
    }
});
