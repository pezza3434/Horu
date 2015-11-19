import alt from '../../public/javascript/alt';
import isotopeStore, {unwrappedIsotopeStore} from '../../public/javascript/stores/isotopeStore.jsx';
import AltTestingUtils from 'alt/utils/AltTestingUtils';
import isotopeActions from '../../public/javascript/actions/isotopeActions';
import {should} from 'chai';

describe.only('isotope store', () => {

    afterEach(() => {
        localStorage.clear();
        alt.flush();
    });

    function loadImageResponse() {
            let data = {
                body: [
                    {"id":61,"path":"/18Nov15201533010pm.png","user_id":18,"age":22},
                    {"id":52,"path":"/8Oct19201532912pm.png","user_id":8,"age":19}
                ]
            };

            let action = isotopeActions.GET_IMAGES_SUCCESS;

            alt.dispatcher.dispatch({action, data});
    }

    function guessAge(index) {

        alt.dispatcher.dispatch({
            action: isotopeActions.SUBMIT_AGE,
            data: {faceIndex:index, ageGuessed: 15}
        });

    }

    describe('when tracking which images to exclude', () => {

        it('should keep track of which images to exclude from the next request', () => {
            loadImageResponse();
            isotopeStore.imageIdsCurrentlyBeingDisplayed()[0].should.equal(61);
            isotopeStore.imageIdsCurrentlyBeingDisplayed()[1].should.equal(52);
        });

        it('should check local storeage for images to exclude from the next request', () => {
            localStorage.setItem('imageIds', JSON.stringify([1,2,52]));

            loadImageResponse();

            isotopeStore.imageIdsCurrentlyBeingDisplayed()[0].should.equal(61);
            isotopeStore.imageIdsCurrentlyBeingDisplayed()[1].should.equal(52);
            isotopeStore.imageIdsCurrentlyBeingDisplayed()[2].should.equal(1);
            isotopeStore.imageIdsCurrentlyBeingDisplayed()[3].should.equal(2);

        });

    });

    describe('when receiving a successful images request', () => {
        it('should create a isotope state map', () => {
            loadImageResponse();

            isotopeStore.getState().isotopeState[0].containerClicked.should.equal(false);
            isotopeStore.getState().isotopeState[0].displayForm.should.equal(false);
            isotopeStore.getState().isotopeState[0].formSubmitted.should.equal(false);
            isotopeStore.getState().isotopeState[0].secondaryImage.should.equal(false);
        });
    });

    describe('refresh images success', () => {
        it('should reset the isotope state and isotope images to the new images', () => {
            loadImageResponse();
            guessAge(1);
            alt.dispatcher.dispatch({
                action: isotopeActions.REFRESH_IMAGES_SUCCESS,
                data: {body: [
                    {"id":10,"path":"/18Nov15201533010pm.png","user_id":18,"age":22},
                    {"id":20,"path":"/8Oct19201532912pm.png","user_id":8,"age":19}
                ]}
            });

            isotopeStore.getState().isotopeState[0].containerClicked.should.equal(false);
            isotopeStore.getState().isotopeState[0].displayForm.should.equal(false);
            isotopeStore.getState().isotopeState[0].formSubmitted.should.equal(false);
            isotopeStore.getState().isotopeState[0].secondaryImage.should.equal(false);

            isotopeStore.getState().isotopeImages[0].id.should.equal(61);
            isotopeStore.getState().isotopeImages[1].id.should.equal(20);
        });
        it('should remove the image and state if no new images available', () => {
            loadImageResponse();
            guessAge(0);
            guessAge(1);
            alt.dispatcher.dispatch({
                action: isotopeActions.REFRESH_IMAGES_SUCCESS,
                data: {body: [
                    {"id":10,"path":"/18Nov15201533010pm.png","user_id":18,"age":22},
                ]}
            });

            isotopeStore.getState().isotopeImages[0].id.should.equal(10);
            should().not.exist(isotopeStore.getState().isotopeImages[1]);
            should().not.exist(isotopeStore.getState().isotopeState[1]);

        });
    });

    describe('refreshImagesError', () => {
        it('should not create error if all pictures have not been submitted', () => {
            loadImageResponse();
            guessAge(0);

            alt.dispatcher.dispatch({action: isotopeActions.REFRESH_IMAGES_ERROR, data: {body: []}});

            isotopeStore.getState().isotopeImages.length.should.equal(1);
            isotopeStore.getState().isotopeState.length.should.equal(1);

        });

        it('should create error if all pictures have been submitted', () => {

            function imageRequest() {
                alt.dispatcher.dispatch({
                    action: isotopeActions.GET_IMAGES_SUCCESS,
                    data: {
                        body: [
                            {"id":61,"path":"/18Nov15201533010pm.png","user_id":18,"age":22},
                            {"id":52,"path":"/8Oct19201532912pm.png","user_id":8,"age":19}
                        ]
                    }
                });
            }

            function causeImageRequestError() {

                alt.dispatcher.dispatch({
                    action: isotopeActions.REFRESH_IMAGES_ERROR,
                     data: {
                         statusCode: 404,
                         body: {error: 'No more images'}
                     }
                 });
            }

            imageRequest();
            guessAge(0);
            guessAge(1);
            causeImageRequestError();

            isotopeStore.getState().isotopeImages.length.should.equal(0);
            isotopeStore.getState().isotopeState.length.should.equal(0);

            isotopeStore.getState().error.status.should.equal(404);
        });
    });

});
