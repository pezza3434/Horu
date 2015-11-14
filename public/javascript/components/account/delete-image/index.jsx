import React from 'react';

export default React.createClass({
    render() {
        console.log(this.props.deleteAction);
        return (
            <div className="account_uploads_stats__delete">
                <span className="account_uploads_stats__delete__button" onClick={this.props.deleteAction.bind(null, this.props.imageId)}>
                    <i className="fa fa-trash"></i>
                    Delete Image
                </span>
            </div>
        )
    }
});
