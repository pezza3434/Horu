var Router = require('react-router');
var Route = Router.Route;
var Account = require('./components/account/index');
var Isotope = require('./components/isotope/index');
var App = require('./components/app');
var React = require('react'); // eslint-disable-line
var About = require('./components/about/index');

var routes = (
    <Route handler={App} name='app' path='/'>
        <Route handler={Isotope} name='isotope' path='/'/>
        <Route handler={Account} name='account' path='account'/>
        <Route handler={About} name='about' path='about'/>
    </Route>
);

export default routes;
