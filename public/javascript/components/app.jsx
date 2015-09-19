var React = require("react");
var Sidebar = require('./sidebar/index')

var App = React.createClass({
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar/>
                </div>
            </div>
        );
    }
});

module.exports = App;
