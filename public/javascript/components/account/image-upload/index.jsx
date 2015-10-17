if (typeof window !== "undefined") {
    require('./style.scss');
    var Cropper = require('react-cropper');
}

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var uploadActions = require('../../../actions/uploadActions');
var uploadStore = require('../../../stores/uploadStore');
var ImageUpload = require('./imageUpload');
var configurationStore = require('../../../stores/configurationStore');

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
    _newImageSelectedAction(e){
       e.preventDefault();
       let files;
       if (e.dataTransfer) {
         files = e.dataTransfer.files;
       } else if (e.target) {
         files = e.target.files;
       }
       let reader = new FileReader();
       reader.onload = () => {
         this.setState({src: reader.result});
       };
       reader.readAsDataURL(files[0]);
    },
    render() {
        let placeHolderImage = configurationStore.getServerUrl() + '/static/placeholder.jpg';
        let imageSource = this.state.src || placeHolderImage;
        return(<ImageUpload showModal={this.state.showModal}
            uploadImageAction={this._uploadImageAction}
            openModalAction={this._openModal}
            closeModalAction={this._closeModal}
            uploadSuccess={this.state.uploadSuccess}
            newImageSelectedAction={this._newImageSelectedAction}
            imageSrc={imageSource}
             />)

    },
    componentWillUnmount() {
        uploadStore.unlisten(this._uploadStoreChange)
    }
});
