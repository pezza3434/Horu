var React = require('react');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./components/global.scss');
var Router = require('react-router');
var routes = require('./routes.jsx');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById("app-container"));
});
