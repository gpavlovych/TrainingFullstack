import * as React from "react";

import {
    Tab,
    Button,
    Col, Form, FormControl, FormGroup, Glyphicon, InputGroup, Jumbotron, Modal, Nav, NavItem,
    Row
} from "react-bootstrap";
const logo = require("./navbar-logo.png");

export enum LoginTab {
    SignIn="signIn",
    SignUp="signUp"
}

export interface ILoginProps {
    isOpened: boolean;
    tab: LoginTab;
    onClose(): {};
    onLogin(username: string, password: string): {};
    onRegister(username: string, password: string): {};
}

export interface ILoginState{
    isOpened: boolean;
    tab: LoginTab;
    signInLogin: string;
    signInPassword: string;
    signUpUsername: string;
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
            signUpUsername: "",
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
        this.props.onRegister(this.state.signUpLogin, this.state.signUpPassword);
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

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                                    <Form style={{marginTop: "10px"}}>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="envelope" />
                                                </InputGroup.Addon>
                                                <FormControl type="text" placeholder="Work Email" name="signInLogin" value={this.state.signInLogin} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="lock" />
                                                </InputGroup.Addon>
                                                <FormControl type="password" placeholder="Your Password" name="signInPassword" value={this.state.signInPassword} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl.Static>
                                                Don't remember your password?
                                            </FormControl.Static>
                                        </FormGroup>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey={LoginTab.SignUp}>
                                    <Form style={{marginTop: "10px"}}>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="envelope" />
                                                </InputGroup.Addon>
                                                <FormControl type="text" placeholder="User Name" name="signUpUsername" value={this.state.signUpUsername} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="envelope" />
                                                </InputGroup.Addon>
                                                <FormControl type="text" placeholder="Work Email" name="signUpLogin" value={this.state.signUpLogin} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="lock" />
                                                </InputGroup.Addon>
                                                <FormControl type="password" placeholder="Your Password" name="signUpPassword" value={this.state.signUpPassword} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Addon>
                                                    <Glyphicon glyph="lock" />
                                                </InputGroup.Addon>
                                                <FormControl type="password" placeholder="Confirm Password" name="signUpConfirmPassword" value={this.state.signUpConfirmPassword} onChange={e=>this.handleChange(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
                {this.state.tab==LoginTab.SignIn && <Button bsStyle="primary" block onClick={()=>this.login()}>Login<Glyphicon glyph="chevron-right"/></Button>}
                {this.state.tab==LoginTab.SignUp && <Button bsStyle="primary" block onClick={()=>this.register()}>Register<Glyphicon glyph="chevron-right"/></Button>}
            </Modal.Footer>
        </Modal>
    }
}