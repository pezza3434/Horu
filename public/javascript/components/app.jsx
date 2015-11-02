import React from 'react';
import Sidebar from './sidebar/index';
import pageActions from '../actions/pageActions';
import { RouteHandler } from 'react-router';

const App = React.createClass({
    componentWillMount() {
        pageActions.appLoaded();
    },
    render() {
        return (
            <div className="container-fluid fill">
                <div className="row fill">
                    <Sidebar/>
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

export default App;
