var Router = require('react-router');
var Route = Router.Route;
var Account = require('./components/account/index');
var Isotope = require('./components/isotope/index');
var App = require('./components/app');
var React = require('react'); // eslint-disable-line

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='isotope' path='/' handler={Isotope}/>
    <Route name='account' path='account' handler={Account}/>
  </Route>
);

export default routes;
