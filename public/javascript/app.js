var React = require('react');
var App = React.createFactory(require("./components/app"));

React.render(App(), document.getElementById("content"));
