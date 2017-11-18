import * as React from "react";
import {Button, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {connect} from 'react-redux'
import {cancelSignIn, logoutAction, openSignIn, openSignUp, registerRequest} from "./actions";
import {Login} from "./Login";
const logo = require('./navbar-logo.png');
export class Header extends React.Component<any> {
    render() {
        return (<Navbar>
            <Login isOpened={this.props.data.isOpened}
                   tab={this.props.data.tab}
                   onRegister={(userName: string, password: string)=>this.props.dispatch(registerRequest(userName,password))}
                   onLogin={(userName: string, password: string)=>this.props.dispatch(registerRequest(userName,password))}
                   onClose={()=>this.props.dispatch(cancelSignIn())}
            />
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
                    (!this.props.data.isLoggedIn)?
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#"><Button onClick={() => this.props.dispatch(openSignIn())}>Log in</Button></NavItem>
                            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => this.props.dispatch(openSignUp())}>Register</Button></NavItem>
                        </Nav>
                        :<Nav pullRight>
                            <NavItem>Welcome, user!</NavItem>
                            <NavItem eventKey={2} href="#"><Button bsStyle="primary" onClick={() => this.props.dispatch(logoutAction())}>Logout</Button></NavItem>
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