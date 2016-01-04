import {Modal, Input, ButtonInput} from 'react-bootstrap';
import React from 'react'; //eslint-disable-line
import LoadingIcon from '../../utils/loading-icon';

const settingsModal = (props) => (
    <Modal show={props.showModal}>
        <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body bsClass='account__upload__modal-body'>
            {props.preferencesGetInProgress ? <LoadingIcon/> :
                <div className="col-md-12">
                    <h4>Email settings</h4>
                    <form>
                        <Input
                            checked={(props.settingsModel && props.settingsModel.weekly || false)}
                            name="weekly"
                            type="checkbox"
                            label="Recieve weekly roundup emails"
                            onChange={props.settingsFormChangeAction}/>
                        <ButtonInput
                            disabled={props.preferencesPostInProgress}
                            type="submit"
                            className="btn btn-default"
                            onClick={props.savePreferencesAction}>{props.settingsSaveText}
                        </ButtonInput>
                    </form>
                </div>
            }
        </Modal.Body>
        <Modal.Footer>
            <button onClick={props.closeModalAction} className="btn btn-default" type="button">Close</button>
        </Modal.Footer>
    </Modal>
);

export default settingsModal;
