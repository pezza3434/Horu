import React from 'react';

export default React.createClass({
    componentWillReceiveProps(props) {
        if (props.containerClicked){
            setTimeout(() =>{
                React.findDOMNode(this.refs.faceInput).focus();
            }, 1)
        }
    },
    _submitForm(e) {
        e.preventDefault();
        var submissionData = {
            imageRatedId: this.props.faceId,
            rating: this.refs.faceInput.getDOMNode().value || this.refs.mobileFaceInput.getDOMNode().value
        };
        this.props.formSubmittedHandler(submissionData);
    },
    render() {
        return (
            <form onSubmit={this._submitForm} ref="faceForm">

                    <div className="box__container box__container--desktop">
                        <input ref="faceInput" min="7" max="99" className="" id="input-1" type="number" autoComplete="off"/>
                        <label className="" htmlFor="input-1">
                            <span className="">How old am I?</span>
                        </label>
                    </div>

                     <div className="box__container box__container--mobile">
                         <input ref="mobileFaceInput" placeholder="How old do I look?" min="7" max="99" className="" id="input-1" type="number" autoComplete="off"/>
                         <input type="submit" value="Submit"/>
                    </div>

                    <input type="submit" className="invisible-submit"/>
            </form>
        );
    }
});
