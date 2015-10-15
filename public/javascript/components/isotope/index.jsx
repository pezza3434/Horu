if (typeof window !== "undefined") {
    require('./style.scss');
}

var React = require('react');
var isotopeActions = require('../../actions/isotopeActions');
var isotopeStore = require('../../stores/isotopeStore');
var configurationStore = require('../../stores/configurationStore');
var Face = require('./face');

module.exports = React.createClass({
    componentDidMount() {
        isotopeStore.listen(this._onChange);
        isotopeActions.getImages();
        this.setState({serverUrl: configurationStore.getServerUrl()});
    },
    _onChange(storeState) {
        if (storeState.isotopeImages.length) {
            this.setState(storeState)
        }
    },
    _renderFaces() {
        var faces = '';
        if(this.state && this.state.isotopeImages) {
            var faces = this.state.isotopeImages.map((face, index) => {
                return <Face key={index} serverUrl={this.state.serverUrl} id={face.id} path={face.path} userId={face.user_id} rated={face.rated} age={face.age}></Face>
            });
        }
        return faces;
    },
    render() {

        var faces = this._renderFaces();

        return (
            <div className="col-sm-10 col-sm-offset-2 content no-padding">
                {faces}
            </div>
        )
    },
    componentWillUnmount() {
        isotopeStore.unlisten(this._onChange);
    },
});
