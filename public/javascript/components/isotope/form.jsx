import React from 'react';

module.exports = React.createClass({
    componentWillReceiveProps(props) {
        if (props.containerClicked){
            React.findDOMNode(this.refs.faceInput).focus();
        }
    },
    render() {
        return (
            <form onSubmit={this.submitFormHandler} ref="faceForm">
                     <div className="box__container">
                         <input ref="faceInput" className="" id="input-1" maxLength="2" type="text" autoComplete="off"/>
                         <label className="" htmlFor="input-1">
                             <span className="">How old am I?</span>
                         </label>
                    </div>
            </form>
        );
    }
});
