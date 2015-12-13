if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react'; //eslint-disable-line

const component = () => (
    <div className="three-bounce fade-in sk-spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
    </div>
);

export default component;
