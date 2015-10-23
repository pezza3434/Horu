import React from 'react';

module.exports = React.createClass({
    render() {
        return (
            <div className="box__container-guess">
                <div className="box__container-guess__guess">You guessed:</div>
                <div className="box__container-guess__guess-number">{this.props.ageGuessed}</div>
                <div className="box__container-guess__real-age">Real Age:</div>
                <div className="box__container-guess__real-age-number">{this.props.age}</div>
            </div>
        );
    }
});
