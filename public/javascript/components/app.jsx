import React from 'react';
import Sidebar from './sidebar/index';
import pageActions from '../actions/pageActions';
import Isotope from './isotope';

const App = React.createClass({
    componentWillMount() {
        pageActions.appLoaded();
    },
    render() {
        const {content, sidebar} = this.props;
        return (
            <div className="container-fluid fill">
                <div className="row fill">
                    {sidebar || <Sidebar/>}
                    {content || <Isotope/>}
                </div>
            </div>
        );
    }
});

export default App;
