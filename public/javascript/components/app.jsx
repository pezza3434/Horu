var React = require("react");

var App = React.createClass({
    click(event) {
        console.log('clicked');
    },
    render() {
        return (
            <div onClick={this.click}>this is serverrrrralexxxxalalalala side man and again</div>
        );
    }
});

module.exports = App;
