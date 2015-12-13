if (typeof window !== 'undefined') {
    require('./style.scss');
    var Cropper = require('../../../utils/reactCropper');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ProgressBar = require('react-bootstrap').ProgressBar;
var classNames = require('classnames');

export default React.createClass({
    propTypes: {
        showModal: React.PropTypes.bool,
        uploadImageAction: React.PropTypes.func,
        openModalAction: React.PropTypes.func,
        closeModalAction: React.PropTypes.func,
        uploadSuccess: React.PropTypes.bool,
        newImageSelectedAction: React.PropTypes.func,
        imageSrc: React.PropTypes.string,
        uploadInProgress: React.PropTypes.bool,
        uploadProgress: React.PropTypes.number
    },
    _uploadImage() {
        this.props.uploadImageAction(this.refs.cropper.getCroppedCanvas().toDataURL());
    },
    render() {

        let uploadIsDisabled = this.props.imageSrc.indexOf('placeholder') > -1 || this.props.uploadInProgress;
        let uploadClassNames = classNames('btn', 'btn-default', 'generate-image', {disabled: uploadIsDisabled});

        return (
            <div className="col-md-12 account__upload">
                <div>
                    <div onClick={this.props.openModalAction} className="btn btn-upload"><i className="fa fa-cloud-upload"></i> Upload your image!</div>
                    <button className="btn btn-logout-account" onClick={this.props.logoutAction}>logout</button>
                </div>
                <Modal show={this.props.showModal} onHide={this.props.closeModalAction}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image Cropper</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass='account__upload__modal-body'>
                        {Cropper ?
                            <Cropper
                            ref='cropper'
                            src={this.props.imageSrc}
                            guides={false}
                            aspectRatio={1 / 1}
                            style={{height:400}}
                            preview='.preview'
                             />
                        : ''}
                    <div className="col-md-12">
                    <label className="btn btn-upload" htmlFor="inputImage" title="Upload image file">
                        <input accept="image/*" className="sr-only" id="inputImage" name="file" type="file" onChange={this.props.newImageSelectedAction}/>
                        <span className="docs-tooltip" data-original-title="Import image with Blob URLs" data-toggle="tooltip" title="">
                            Choose Image
                        </span>
                    </label>
                    <button disabled={uploadIsDisabled} onClick={this._uploadImage} className={uploadClassNames}><span>{this.props.uploadInProgress ? 'Uploading...': 'Upload Image'}</span></button>
                    {this.props.facialRecognitionInProgress ? <div>Facial recognition in progress...</div> : ''}
                    {this.props.facialRecognitionError ? <div>Unfortunately we failed to find a face in this photo. Please try again..</div> : ''}
                    {this.props.uploadInProgress ? <ProgressBar className="progressBar" active now={this.props.uploadProgress || 0} /> : ''}
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
