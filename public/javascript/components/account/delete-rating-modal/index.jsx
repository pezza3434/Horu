if (typeof window !== 'undefined') {
    require('./style.scss');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;

export default React.createClass({
    _cancelImageDelete() {
        this.props.cancelModalAction();
    },
    _confirmImageDelete() {
        this.props.deleteImageAction(this.props.idToDelete);
    },
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this._cancelImageDelete}>
                    <Modal.Body>
                        <div className="delete-rating-modal">
                            <h3>Are you sure you want to delete this image?</h3>
                            {this.props.imageDeleteSuccessful ? '' :<button onClick={this._confirmImageDelete} className="btn btn-default btn-lg">Yes</button>}
                            {this.props.imageDeleteSuccessful ? '' :<button onClick={this._cancelImageDelete} className="btn btn-default btn-lg">No</button>}
                            {this.props.imageDeleteSuccessful ? <button className="btn btn-success btn-lg">Message Deleted!</button> : '' }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
});
