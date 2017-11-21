import * as React from "react";
import {Button, Modal, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {connect} from 'react-redux'
import {Login, LoginTab} from "./Login";
import {TypeKeys} from "../middleware/actions";
const logo = require('../navbar-logo.png');
class Header extends React.Component<any> {
    render() {
        let history = this.props.history;
        return (<Navbar>
            <Login isOpened={this.props.data.isSignInFormOpened || this.props.data.isSignUpFormOpened}
                   tab={this.props.data.isSignUpFormOpened ? LoginTab.SignUp:LoginTab.SignIn}
                   onRegister={(username: string, email: string, password: string)=>this.props.dispatch({
                       type: TypeKeys.REGISTER_REQUEST_ACTION,
                       username,
                       email,
                       password,
                       callback: () => {
                           console.log('callback called!');
                           debugger;
                           history.push('/dashboard');
                       }
                   })}
                   onLogin={(email: string, password: string)=>this.props.dispatch({
                       type: TypeKeys.LOGIN_REQUEST_ACTION,
                       email,
                       password,
                       callback: () => {
                           console.log('callback called!');
                           history.push('/dashboard');
                       }
                   })}
                   onClose={()=>this.props.dispatch({type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION})}
            />
            <Modal show={this.props.data.isErrorMessageOpened} onHide={()=>this.props.dispatch({type: TypeKeys.CLOSE_ERROR_MESSAGE_ACTION})}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Error occured.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.data.errorMessage}
                </Modal.Body>
            </Modal>
            <Navbar.Header>
                <Navbar.Brand>
                    <a className="navbar-brand" href="#"><img height="20px" style={{ float: 'left' }}  src={logo}/>Auth03</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={1} title="Platform" id="platform-nav-dropdown" />
                    <NavDropdown eventKey={2} title="Solutions" id="solutions-nav-dropdown" />
                    <NavDropdown eventKey={3} title="Why Auth0?" id="why-auth0-nav-dropdown" />
                    <NavDropdown eventKey={4} title="Developers" id="developers-nav-dropdown" />
                    <NavItem eventKey={5} href="#">Pricing</NavItem>
                    <NavItem eventKey={6} href="#">Talk to Sales</NavItem>
                </Nav>
                {
                    (!this.props.data.token)?
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#"><Button onClick={() => this.props.dispatch({type: TypeKeys.OPEN_SIGNIN_FORM_ACTION})}>Log in</Button></NavItem>
                            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => this.props.dispatch({type: TypeKeys.OPEN_SIGNUP_FORM_ACTION})}>Register</Button></NavItem>
                        </Nav>
                        :<Nav pullRight>
                            <NavItem>Welcome, {this.props.data.username}!</NavItem>
                            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => this.props.dispatch({type: TypeKeys.LOGOUT_REQUEST_ACTION,
                                callback: () => {
                                    console.log('callback called!');
                                    history.push('/');
                                }
                            })}>Logout</Button></NavItem>
                        </Nav>
                }
            </Navbar.Collapse>
        </Navbar>);
    }
}

function select (state: any) {
    return {
        data: state
    }
}

export default connect(select)(Header);