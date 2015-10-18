if (typeof window !== "undefined") {
    require('./style.scss');
    var Cropper = require('../../../utils/reactCropper');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var ImageUpload = require('./imageUpload');

var uploadStore = require('../../../stores/uploadStore');

var uploadActions = require('../../../actions/uploadActions');

module.exports = React.createClass({
    getInitialState() {
        return uploadStore.getState();
    },
    componentDidMount() {
        uploadStore.listen(this._uploadStoreChange)
    },
    _uploadStoreChange(storeState) {
        this.setState(storeState);
    },
    _openModal() {
        uploadActions.triggerModal(true);
    },
    _closeModal() {
        uploadActions.triggerModal(false);
    },

    render() {

        return(<ImageUpload
            showModal={this.state.showModal}
            uploadImageAction={uploadActions.postUpload}
            openModalAction={this._openModal}
            closeModalAction={this._closeModal}
            uploadSuccess={this.state.uploadSuccess}
            newImageSelectedAction={uploadActions.selectNewImage}
            imageSrc={this.state.selectedImage}
            uploadInProgress={this.state.apiCallInProgress}
            uploadProgress={this.state.uploadProgress}
             />)

    },
    componentWillUnmount() {
        uploadStore.unlisten(this._uploadStoreChange)
    }
});
