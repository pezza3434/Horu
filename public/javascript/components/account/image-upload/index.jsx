if (typeof window !== "undefined") {
    require('./style.scss');
    var Cropper = require('react-cropper');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var uploadActions = require('../../../actions/uploadActions');
var uploadStore = require('../../../stores/uploadStore');
var ImageUpload = require('./imageUpload');

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
    _uploadImageAction(imageData) {
        uploadActions.postUpload(imageData);
    },
    render() {
        return(<ImageUpload showModal={this.state.showModal}
            uploadImageAction={this._uploadImageAction}
            openModalAction={this._openModal}
            closeModalAction={this._closeModal}
            uploadSuccess={this.state.uploadSuccess} />)

    }
});
