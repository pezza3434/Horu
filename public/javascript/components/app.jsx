var React = require("react");
var Sidebar = require('./sidebar/index');
var Isotope = require('./isotope/index');

var App = React.createClass({
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                    <Isotope/>
                </div>
            </div>
        );
    }
});

module.exports = App;
