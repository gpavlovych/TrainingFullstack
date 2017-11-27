import * as React from 'react';
import { Button, Nav, NavItem } from 'react-bootstrap';
import {
    createLogoutRequestAction,
    createOpenSignInFormAction,
    createOpenSignUpFormAction
} from '../../middleware/actions';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../middleware/reducers';

interface RightNavBarProps {
    firstName: string;
    lastName: string;
    token: string;
    onLogin: () => {};
    onRegister: () => {};
    // tslint:disable-next-line
    history?: any;
    onLogout: (callback: () => void) => {};
}

const RightNavBar: React.StatelessComponent<RightNavBarProps> = (props: RightNavBarProps) => {
    return (!props.token) ?
        (
            <Nav pullRight={true}>
                <NavItem eventKey={1} href="#"><Button onClick={() => props.onLogin()}>Log in</Button></NavItem>
                <NavItem eventKey={2} href="#">
                    <Button
                        bsStyle="primary"
                        onClick={() => props.onRegister()}
                    >
                        Register
                    </Button>
                </NavItem>
            </Nav>
        ) : (
            <Nav pullRight={true}>
                <NavItem>Welcome, <b>{props.firstName} {props.lastName}</b>!</NavItem>
                <NavItem eventKey={2} href="#">
                    <Button
                        bsStyle="primary"
                        onClick={() => props.onLogout(() => { props.history.push('/'); })}
                    >
                        Logout
                    </Button>
                </NavItem>
            </Nav>
        );
};

const mapStateToProps = (state: RootState) => ({
    firstName: state.currentUserFirstName,
    lastName: state.currentUserLastName,
    token: state.currentUserToken,
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    onLogin: () => { dispatch(createOpenSignInFormAction()); },
    onRegister: () => { dispatch(createOpenSignUpFormAction()); },
    onLogout: (callback: () => {}) => { dispatch(createLogoutRequestAction(callback)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(RightNavBar);