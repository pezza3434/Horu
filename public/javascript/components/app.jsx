import React from 'react';
import Sidebar from './sidebar/index';
import Isotope from './isotope/index';
import pageActions from '../actions/pageActions';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

const App = React.createClass({
    componentWillMount() {
        pageActions.appLoaded();
    },
    render() {
        return (
            <div className="container-fluid fill">
                <div className="row fill">
                    <Sidebar/>
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;
