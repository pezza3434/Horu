var React = require('react');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./components/global.scss');
var Router = require('react-router');
import routes from './routes.jsx'

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById("app-container"));
});
