import * as React from 'react';

import {
    Tab,
    Col,
    Jumbotron,
    Modal,
    Nav,
    NavItem,
    Row
} from 'react-bootstrap';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../middleware/reducers';
import {
    createCloseSignInFormAction,
    createLoginRequestAction,
    createOpenSignInFormAction,
    createOpenSignUpFormAction,
    createRegisterRequestAction
} from '../../middleware/actions';
const logo = require('../Header/navbar-logo.png');

enum LoginTab {
    SignIn = 'signIn',
    SignUp = 'signUp'
}

interface LoginProps {
    tab: LoginTab;
    isOpened: boolean;
    // tslint:disable-next-line
    history: any;
    onClose: () => {};
    onLogin: (email: string, password: string, callback: () => void) => {};
    onRegister: (userPhoto: Blob|null,
                 position: string,
                 firstName: string,
                 lastName: string,
                 email: string,
                 password: string,
                 callback: () => void) => {};
    // tslint:disable-next-line
    onTabOpened: (tab: any) => {};
}

const Login: React.StatelessComponent<LoginProps> = (props: LoginProps) => (
    <Modal
        bsSize="small"
        show={props.isOpened}
        aria-labelledby="contained-modal-title-lg"
        onHide={() => props.onClose()}
    >
        <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title-lg">
                <Jumbotron style={{textAlign: 'center'}}>
                    <img
                        style={{marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '70px'}}
                        src={logo}
                    />
                    <h2>Auth0</h2>
                </Jumbotron>
                <Nav
                    bsStyle="tabs"
                    justified={true}
                    onSelect={(tab) => props.onTabOpened(tab)}
                    activeKey={props.tab}
                >
                    <NavItem eventKey={LoginTab.SignIn}>
                        Sign In
                    </NavItem>
                    <NavItem eventKey={LoginTab.SignUp}>
                        Sign Up
                    </NavItem>
                </Nav>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Tab.Container
                id="tabs-login"
                activeKey={props.tab}
                onSelect={(tab) => props.onTabOpened(tab)}
            >
                <Row className="clearfix">
                    <Col sm={12}>
                        <Tab.Content animation={true}>
                            <Tab.Pane eventKey={LoginTab.SignIn}>
                                <SignInForm
                                    submit={
                                        (email: string, password: string) =>
                                            props.onLogin(email, password, () => props.history.push('/dashboard'))
                                    }
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey={LoginTab.SignUp}>
                                <SignUpForm
                                    submit={
                                        (userPhoto: Blob|null,
                                         position: string,
                                         firstName: string,
                                         lastName: string,
                                         email: string,
                                         password: string) =>
                                            props.onRegister(
                                                userPhoto,
                                                firstName,
                                                lastName,
                                                position,
                                                email,
                                                password,
                                                () => props.history.push('/dashboard'))
                                    }
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Modal.Body>
    </Modal>
);

const mapStateToProps = (state: RootState) => ({
    isOpened: state.isSignInFormOpened || state.isSignUpFormOpened,
    tab: state.isSignUpFormOpened ? LoginTab.SignUp : LoginTab.SignIn
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    onClose: () => {
        dispatch(createCloseSignInFormAction());
    },
    onLogin: (email: string, password: string, callback: () => void) => {
        dispatch(createLoginRequestAction(email, password, callback));
    },
    onRegister: (userPhoto: Blob | null,
                 position: string,
                 firstName: string,
                 lastName: string,
                 email: string,
                 password: string,
                 callback: () => void) => {
        dispatch(
            createRegisterRequestAction(
                userPhoto,
                firstName,
                lastName,
                position,
                email,
                password,
                callback
            )
        );
    },
    onTabOpened: (tab: LoginTab) => {
        if (tab === LoginTab.SignIn) {
            dispatch(createOpenSignInFormAction());
        } else {
            dispatch(createOpenSignUpFormAction());
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);