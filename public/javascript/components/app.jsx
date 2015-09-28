var React = require("react");
var Sidebar = require('./sidebar/index');
var Isotope = require('./isotope/index');
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';


var App = React.createClass({
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
