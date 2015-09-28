import React from 'react';
import Sidebar from './sidebar/index';
import Isotope from './isotope/index';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

const App = React.createClass({
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;
