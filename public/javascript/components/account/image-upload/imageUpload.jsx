if (typeof window !== "undefined") {
    require('./style.scss');
    var Cropper = require('react-cropper');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var uploadActions = require('../../../actions/uploadActions');
var uploadStore = require('../../../stores/uploadStore');

module.exports = React.createClass({
    propTypes: {
        showModal: React.PropTypes.bool,
        uploadImageAction: React.PropTypes.func,
        openModalAction: React.PropTypes.func,
        closeModalAction: React.PropTypes.func,
        uploadSuccess: React.PropTypes.bool
    },
    _uploadImage() {
        this.props.uploadImageAction(this.refs.cropper.getCroppedCanvas().toDataURL());
    },
    render() {

        return (
            <div className="col-md-12 account__upload">
                <div>
                    <div onClick={this.props.openModalAction} className="btn btn-upload"><i className="fa fa-cloud-upload"></i> Upload your image!</div>
                </div>
                <Modal show={this.props.showModal} onHide={this.props.closeModalAction}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image Cropper</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="col-md-12">
                        {Cropper ?
                            <Cropper
                            ref='cropper'
                            src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
                            guides={false}
                            aspectRatio={1 / 1}
                            style={{height:400}}
                            preview='.preview'
                             />
                        : ''}
                    </div>
                    <div className="col-md-12">
                    <label className="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
                        <input accept="image/*" className="sr-only" id="inputImage" name="file" type="file" />
                        <span className="docs-tooltip" data-original-title="Import image with Blob URLs" data-toggle="tooltip" title="">
                            Choose Image
                        </span>
                    </label>
                    <button onClick={this._uploadImage} className="btn btn-default generate-image"><span>Upload Image</span></button>
                    {this.props.uploadSuccess ? <div className="success-message btn btn-success">Your image has been uploaded!</div> : ''}
                    </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.props.closeModalAction} className="btn btn-default" type="button">Close</button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
});