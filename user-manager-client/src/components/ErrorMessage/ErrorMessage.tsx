import { createCloseErrorMessageAction } from '../../middleware/actions';
import { Modal } from 'react-bootstrap';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../middleware/reducers';

interface ErrorMessageProps {
    isErrorMessageOpened: boolean;
    errorMessage: string;
    onClose: () => {};
}

const ErrorMessage: React.StatelessComponent<ErrorMessageProps> = (props: ErrorMessageProps) => (
    <Modal show={props.isErrorMessageOpened} onHide={() => props.onClose()}>
        <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title-lg">
                Error occured.
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.errorMessage}
        </Modal.Body>
    </Modal>
);

const mapStateToProps = (state: RootState) => ({
    isErrorMessageOpened: state.isErrorMessageOpened,
    errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    onClose: () => { dispatch(createCloseErrorMessageAction()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);