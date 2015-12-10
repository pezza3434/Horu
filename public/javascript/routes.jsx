var Router = require('react-router');
var Route = Router.Route;
var Account = require('./components/account/index');
var Isotope = require('./components/isotope/index');
var Sidebar = require('./components/sidebar/index');
var App = require('./components/app');
var React = require('react'); // eslint-disable-line
var About = require('./components/about/index');

import { IndexRoute } from 'react-router';

var routes = (
    <Route component={App} name='app' path='/'>
        <IndexRoute components={{sidebar: Sidebar, content: Isotope}} />
        <Route components={{sidebar: Sidebar, content: Account}} name='account' path='account'/>
        <Route components={{sidebar: Sidebar, content: About}} name='about' path='about'/>
        <Route components={{sidebar: Sidebar, content: Isotope}} name='password-reset' path='/:passwordreset'/>
    </Route>
);

export default routes;
