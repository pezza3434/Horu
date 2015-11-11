if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

import Ratings from '../account/ratings';
import RegisterButton from '../register-button';

const fakeRatings = [{
    image_thumbnail: '/profileimage.jpg',
    current_rating: '24',
    votes: '64'
},{
    image_thumbnail: '/vanessa.jpg',
    current_rating: '20',
    votes: '23'
}];

export default React.createClass({
    render() {
        return (
            <div className="col-sm-10 col-sm-offset-2 content fill about-us">
                <div className="row">
                    <div className="col-md-12 centre">
                        <h1 className="about-us__title">Horu.io enables you to find out exactly how old you look</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 centre">
                        <p className="about-us__description">
                            You upload a single, or number of, personal image's of yourself and other people decide on how old they think you look; you in turn can vote on other peoples images.
                        </p>
                    </div>
                </div>
                <div className="row about-us__mock-faces">
                    <div className="col-xs-12 col-sm-6 col-md-4 grid-item no-padding">
                        <img className="grid-item__image img-responsive" src="/images/farz.jpg"/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 grid-item no-padding clicked">
                        <img className="grid-item__image img-responsive" src="/images/farz.jpg"/>
                        <div className="box">
                            <div className="grid-item__text__input">
                                <form>
                                    <div className="box__container">
                                        <input min="7" value="26" max="99" id="input-1" type="number" autocomplete="off"/>
                                        <label for="input-1" >
                                            <span className="">How old am I?</span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="box__container-guess">
                                <div className="box__container-guess__guess">You guessed:</div>
                                <div className="box__container-guess__guess-number"></div>
                                <div className="box__container-guess__real-age">Real Age:</div>
                                <div className="box__container-guess__real-age-number">25</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 grid-item no-padding clicked">
                        <img className="grid-item__image img-responsive" src="/images/farz.jpg"/>
                        <div className="box submitted">
                            <div className="box__container-guess">
                                <div className="box__container-guess__guess">You guessed:</div>
                                <div className="box__container-guess__guess-number">26</div>
                                <div className="box__container-guess__real-age">Real Age:</div>
                                <div className="box__container-guess__real-age-number">29</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 centre">
                        <p className="about-us__description">
                            HORU then gives you a dashboard where you can see the averages of these votes. This results in the most reliable way of finding out how old other people think you look.
                        </p>
                    </div>
                </div>
                <div className="row about-us__ratings">
                    <Ratings serverUrl={'/images'} ratings={fakeRatings} />
                </div>
                <div className="row">
                    <div className="col-md-12 centre">
                        <h1 className="about-us__call-to-action">Find the answer to the question you've asked yourself for years</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 centre">
                        <RegisterButton buttonClassName="btn btn-default about-us__join-now" buttonText="Join Us"/>
                    </div>
                </div>
            </div>
        );
    }
});
