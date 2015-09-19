var React = require('react');

module.exports = React.createClass({
    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 grid-item no-padding">
                <img className="grid-item__image img-responsive">
                <div className="grid-item__text">
                    <div className="grid-item__text__main"></div>
                    <div className="grid-item__text__input">
                        <form>
                            <div className="box">
                                <div className="box__container">
                                    <inputclassName="" id="input-1" maxlength=2 type="text">
                                    <label className="" for="input-1">
                                        <span className="">How old am I?</span>
                                    </label>
                                    <div className="box__container__guess">You guessed:</div>
                                    <div className="box__container__guess-number">{{age}}</div>
                                    <div className="box__container__real-age">Real Age:</div>
                                    <div className="box__container__real-age-number">{{image.age}}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="grid-item__text__rated">
                        You have rated this image previously
                    </div>
                </div>
                <div className="grid-item__overlay"></div>
            </div>
        )
    }
});
