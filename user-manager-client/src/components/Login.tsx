import * as React from "react";

import {
    Tab,
    Col, Jumbotron, Modal, Nav, NavItem,
    Row
} from "react-bootstrap";
import {SignUpForm} from "./SignUpForm";
import {SignInForm} from "./SignInForm";
const logo = require("../navbar-logo.png");

export enum LoginTab {
    SignIn="signIn",
    SignUp="signUp"
}

export interface ILoginProps {
    isOpened: boolean;
    tab: LoginTab;
    onClose(): {};
    onLogin(username: string, password: string): {};
    onRegister(firstname: string, lastname: string, position: string, email: string, password: string): {};
}

export interface ILoginState{
    isOpened: boolean;
    tab: LoginTab;
    signInLogin: string;
    signInPassword: string;
    signUpPosition: string,
    signUpFirstname: string,
    signUpLastname: string,
    signUpLogin: string;
    signUpPassword: string;
    signUpConfirmPassword: string;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            isOpened: props.isOpened,
            tab: props.tab,
            signInLogin: "",
            signInPassword: "",
            signUpPosition: "",
            signUpFirstname: "",
            signUpLastname: "",
            signUpLogin: "",
            signUpPassword: "",
            signUpConfirmPassword: ""
        };
    }
    private closeWindow(){
        this.setState({isOpened: false});
    }
    close() {
        this.props.onClose();
        this.closeWindow();
    }

    login(){
        this.props.onLogin(this.state.signInLogin, this.state.signInPassword);
        this.closeWindow();
    }

    register(){
        this.props.onRegister(this.state.signUpFirstname, this.state.signUpLastname, this.state.signUpPosition, this.state.signUpLogin, this.state.signUpPassword);
        this.closeWindow();
    }

    componentWillReceiveProps(nextProps: ILoginProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.tab !== this.state.tab) {
            this.setState({ tab: nextProps.tab });
        }

        if (nextProps.isOpened !== this.state.isOpened) {
            this.setState({ isOpened: nextProps.isOpened });
        }
    }

    render() {
        // tab accepting current url
        return <Modal bsSize="small" show={this.state.isOpened} aria-labelledby="contained-modal-title-lg" onHide={()=>this.close()}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                    <Jumbotron style={{textAlign: 'center'}}>
                        <img style={{marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '70px'}} src={logo}/>
                        <h2>Auth0</h2>
                    </Jumbotron>
                    <Nav bsStyle="tabs" justified onSelect={(key: any)=>this.setState({tab: key})} activeKey={this.state.tab}>
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
                <Tab.Container id="tabs-login" activeKey={this.state.tab}>
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey={LoginTab.SignIn}>
                                    <SignInForm submit={(email: string, password: string)=>this.props.onLogin(email, password)}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey={LoginTab.SignUp}>
                                    <SignUpForm submit={(userPhoto: Blob|undefined,
                                                         position: string,
                                                         firstName: string,
                                                         lastName: string,
                                                         email: string,
                                                         password: string)=>this.props.onRegister(firstName, lastName, position, email, password)}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    }
}