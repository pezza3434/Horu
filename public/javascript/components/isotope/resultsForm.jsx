import React from 'react';
import cn from 'classnames';

export default React.createClass({
    render() {
        return (
            <div className={cn('box__container-guess', {'invalid': this.props.validationError})}>
                {this.props.validationError ? <div className="box__container-guess__invalid">Whoops! This vote will not be counted.</div>: ''}
                <div className="box__container-guess__guess">You guessed:</div>
                <div className="box__container-guess__guess-number">{this.props.ageGuessed}</div>
                <div className="box__container-guess__real-age">Real Age:</div>
                <div className="box__container-guess__real-age-number">{this.props.age}</div>
                <div onClick={this.props.refreshFacesHander} className="box__container-refresh"><i className="fa fa-refresh"></i></div>
            </div>
        );
    }
});
