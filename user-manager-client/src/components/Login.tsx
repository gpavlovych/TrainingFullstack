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
    onLogin(email: string, password: string): {};
    onRegister(userPhoto: Blob|null, firstName: string, lastName: string, position: string, email: string, password: string): {};
}

export interface ILoginState{
    isOpened: boolean;
    tab: LoginTab;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            isOpened: props.isOpened,
            tab: props.tab
        };
    }
    private closeWindow(){
        this.setState({isOpened: false});
    }
    close() {
        this.props.onClose();
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
                                    <SignUpForm submit={(userPhoto: Blob|null,
                                                         position: string,
                                                         firstName: string,
                                                         lastName: string,
                                                         email: string,
                                                         password: string)=>this.props.onRegister(userPhoto, firstName, lastName, position, email, password)}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    }
}