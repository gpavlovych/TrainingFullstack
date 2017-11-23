import * as React from "react";
import {Button, Nav, NavItem} from "react-bootstrap";
import {createLogoutRequestAction, createOpenSignInFormAction, createOpenSignUpFormAction} from "../middleware/actions";
import {connect, Dispatch} from "react-redux";
import {RootState} from "../middleware/reducers";

interface IRightNavBarProps {
    firstName: string;
    lastName: string;
    token: string;
    onLogin: ()=>any;
    onRegister: ()=>any;
    history?: any;
    onLogout: (callback: ()=>void)=>any;
}

const RightNavBar: React.StatelessComponent<IRightNavBarProps> = (props: IRightNavBarProps)=>{
    return (!props.token)?
        <Nav pullRight>
            <NavItem eventKey={1} href="#"><Button onClick={() => props.onLogin()}>Log in</Button></NavItem>
            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => props.onRegister()}>Register</Button></NavItem>
        </Nav>
        :<Nav pullRight>
            <NavItem>Welcome, <b>{props.firstName} {props.lastName}</b>!</NavItem>
            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => props.onLogout(
                () => {
                    console.log('callback called!');
                    props.history.push('/');
                })}>Logout</Button></NavItem>
        </Nav>};

const mapStateToProps = (state: RootState) => ({
    firstName: state.currentUserFirstName,
    lastName: state.currentUserLastName,
    token: state.currentUserToken,
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    onLogin: ()=>dispatch(createOpenSignInFormAction()),
    onRegister: ()=>dispatch(createOpenSignUpFormAction()),
    onLogout: (callback: ()=>any)=>dispatch(createLogoutRequestAction(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightNavBar);