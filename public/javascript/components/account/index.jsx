import React from 'react';
import Header from './header/index';
import Upload from './image-upload/index';
import Ratings from './ratings';
import ratingsActions from '../../actions/ratingsActions';
import ratingsStore from '../../stores/ratingsStore';


module.exports = React.createClass({
    componentDidMount() {
        ratingsActions.getRatings();
        ratingsStore.listen(this._ratingsStoreChange);
    },
    getInitialState() {
        return {ratings:false};
    },
    _ratingsStoreChange(storeState) {
        if (ratingsStore.hasRatings()){
            this.setState({ratings: storeState.ratings});
        }
    },
    render() {
        return (
            <div className="col-sm-10 col-sm-offset-2 content no-padding">
                <div className="account">
                    <Header/>
                    <Upload/>
                    {this.state.ratings ? <Ratings ratings={this.state.ratings} /> : ''}
                </div>
            </div>
        )
    }
});
