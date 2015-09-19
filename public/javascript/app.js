var React = require('react');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./components/global.scss');
var App = React.createFactory(require("./components/app"));

React.render(App(), document.getElementById("app-container"));
