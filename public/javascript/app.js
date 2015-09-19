var React = require('react');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
var App = React.createFactory(require("./components/app"));

React.render(App(), document.getElementById("app-container"));
