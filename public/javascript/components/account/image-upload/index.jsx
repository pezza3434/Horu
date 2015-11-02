if (typeof window !== 'undefined') {
    require('./style.scss');
    require('tracking/build/tracking-min.js');
    require('tracking/build/data/face-min.js');
    require('tracking/build/data/eye-min.js');
    require('tracking/build/data/mouth-min.js');
}

var React = require('react');
var ImageUpload = require('./imageUpload');

var uploadStore = require('../../../stores/uploadStore');
var sessionActions = require('../../../actions/sessionActions');

var uploadActions = require('../../../actions/uploadActions');


export default React.createClass({
    getInitialState() {
        return uploadStore.getState();
    },
    componentDidMount() {
        uploadStore.listen(this._uploadStoreChange);
    },
    _uploadStoreChange(storeState) {
        this.setState(storeState);
    },
    _openModal() {
        uploadActions.triggerModal(true);
    },
    _closeModal() {
        if (this.state.apiCallInProgress) {
            uploadActions.abortUpload(this.state.xhrObject);
        }
        uploadActions.triggerModal(false);
    },
    _uploadImageAction(dataURL) {
        //At the moment this is currently relying on the
        //fact that .preview img exists
        var tracker = new tracking.ObjectTracker(['face']);
        tracking.track('.preview img', tracker);
        uploadActions.beginFacialRecognition();
        tracker.on('track', function(event) {
            if (event.data.length > 0) {
                uploadActions.postUpload(dataURL);
            } else {
                uploadActions.facialRecognitionError();
            }
        });
    },

    _logoutAction() {
        window.location.href = '/';
        sessionActions.logout();
    },
    render() {
        return(<ImageUpload
            showModal={this.state.showModal}
            uploadImageAction={this._uploadImageAction}
            openModalAction={this._openModal}
            closeModalAction={this._closeModal}
            uploadSuccess={this.state.uploadSuccess}
            newImageSelectedAction={uploadActions.selectNewImage}
            imageSrc={this.state.selectedImage}
            uploadInProgress={this.state.apiCallInProgress}
            facialRecognitionInProgress={this.state.facialRecognitionInProgress}
            facialRecognitionError={this.state.facialRecognitionError}
            uploadProgress={this.state.uploadProgress}
            logoutAction={this._logoutAction}
             />);

    },
    componentWillUnmount() {
        uploadStore.unlisten(this._uploadStoreChange);
    }
});
