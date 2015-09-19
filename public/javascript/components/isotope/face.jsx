var React = require('react');

module.exports = React.createClass({
    render() {
        var url = 'http://generation.com:3000/static' + this.props.path;
        return (
            <div>
                <img class="grid-item__image img-responsive" src={url} />

            </div>
        )
    }
});


// <div class="grid-item__text">
//     <div class="grid-item__text__main" ng-show="show && !submitted && !image.rated"></div>
//     <div class="grid-item__text__input">
//         <form ng-show="show && image.rated === false" ng-submit="submitAge()">
//             <div class="box" ng-class="{submitted: submitted && image.rated === false}">
//                 <div class="box__container">
//                     <input ng-model="age" class="" id="input-1" maxlength=2 type="text">
//                     <label class="" for="input-1">
//                         <span class="">How old am I?</span>
//                     </label>
//                     <div class="box__container__guess" ng-show="submitted && image.rated === false" >You guessed:</div>
//                     <div class="box__container__guess-number" ng-show="submitted && image.rated === false">{{age}}</div>
//                     <div class="box__container__real-age" ng-show="submitted && image.rated === false">Real Age:</div>
//                     <div class="box__container__real-age-number" ng-show="submitted && image.rated === false">{{image.age}}</div>
//                 </div>
//             </div>
//         </form>
//     </div>
//     <div class="grid-item__text__rated" ng-show="image.rated === true">
//         You have rated this image previously
//     </div>
// </div>
// <div class="grid-item__overlay" ng-show="show || submitted || image.rated === true"></div>
