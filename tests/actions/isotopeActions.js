import alt from '../../public/javascript/alt';
var injector = require('inject?../stores/configurationStore&../stores/sessionStore&../stores/isotopeStore!../../public/javascript/actions/isotopeActions');
import {should} from 'chai';
import isotopeActions from '../../public/javascript/actions/isotopeActions';
var itshould = should();

describe('isotopeActions', function () {

    let dispatcherSpy;

    //mock isotope actions and test endpoint
    beforeEach(() => {
        dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    });

    afterEach(() => {
        alt.dispatcher.dispatch.restore();
    });

    function mockXhr() {
        let xhr = sinon.useFakeXMLHttpRequest();
        let requests = [];

        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };

        return requests;
    }

    function mockIsotopeActions(authenticationToken, isLoggedIn, imageIdsCurrentlyBeingDisplayed) {
        return injector({
            '../stores/configurationStore': {
                getServerUrl () {
                    return 'horu.io';
                }
            },
            '../stores/isotopeStore': {
                default: {
                    imageIdsCurrentlyBeingDisplayed() {
                        return imageIdsCurrentlyBeingDisplayed || [1,2,3];
                    }
                }
            },
            '../stores/sessionStore': {
                isLoggedIn() {
                    return isLoggedIn || false;
                },
                getAuthenticationToken() {
                    return authenticationToken || '';
                }
            }
        });
    }

    describe('get images', () => {

        it('should use the /images endpoint with no exclusions', () => {

            let isotopeActions = mockIsotopeActions('', true);

            let requests = mockXhr();

            isotopeActions.getImages();

            requests[0].url.should.equal('horu.io/images')

        });

        it('should make a call excluding any visible or previously voted images if any exist and the user is not logged in', () => {

            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.getImages();

            requests[0].url.should.equal('horu.io/images?exclude=1,2,3');

        });

        it('should set the authentication token as the header if it has been set', () => {
            let isotopeActions = mockIsotopeActions('123');

            let requests = mockXhr();

            isotopeActions.getImages();

            requests[0].requestHeaders['x-access-token'].should.equal('123')

        });

        it('should not set the authentication token if it has not been set', () => {
            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.getImages();

            itshould.not.exist(requests[0].requestHeaders['x-access-token']);

        });

        it('should dispatch', function () {

            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.getImages();

            requests[0].respond(200, {});

            dispatcherSpy.args[0][0].type.should.include('isotopeActions.getImages');
            dispatcherSpy.args[1][0].type.should.include('isotopeActions.getImagesSuccess');

        });

        it('should dispatch an error if the api returns an error', () => {

            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.getImages();

            requests[0].respond(404, {});

            dispatcherSpy.args[0][0].type.should.include('isotopeActions.getImages');
            dispatcherSpy.args[1][0].type.should.include('isotopeActions.getImagesError');
        });


    });

    describe('Refresh Images', () => {
        it('should use the /images endpoint with no exclusions if no other images are visible', () => {
            let isotopeActions = mockIsotopeActions('', true, []);

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].url.should.equal('horu.io/images')
        });

        it('should use the /images endpoint with exclusions if other images are visible and the user is logged in', () => {
            let isotopeActions = mockIsotopeActions('', true);

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].url.should.equal('horu.io/images?exclude=1,2,3');
        });

        it('should use the /images endpoint with exclusions if the user is logged out and has previously rated other images', () => {
            let isotopeActions = mockIsotopeActions('');

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].url.should.equal('horu.io/images?exclude=1,2,3');
        });

        it('should set the authentication token as the header if it has been set', () => {
            let isotopeActions = mockIsotopeActions('123');

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].requestHeaders['x-access-token'].should.equal('123')

        });

        it('should not set the authentication token if it has not been set', () => {
            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.refreshImages();

            itshould.not.exist(requests[0].requestHeaders['x-access-token']);
        });

        it('should dispatch', function () {

            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].respond(200, {});

            dispatcherSpy.args[0][0].type.should.include('isotopeActions.refreshImages');
            dispatcherSpy.args[1][0].type.should.include('isotopeActions.refreshImagesSuccess');

        });

        it('should dispatch an error if the api returns an error', () => {

            let isotopeActions = mockIsotopeActions();

            let requests = mockXhr();

            isotopeActions.refreshImages();

            requests[0].respond(404, {});

            dispatcherSpy.args[0][0].type.should.include('isotopeActions.refreshImages');
            dispatcherSpy.args[1][0].type.should.include('isotopeActions.refreshImagesError');
        });

    });
});
