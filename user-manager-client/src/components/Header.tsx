import * as React from "react";
import Login from "./Login";
import ErrorMessage from "./ErrorMessage";
import {default as RightNavBar} from "./RightNavBar";
import {Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
const logo = require('../navbar-logo.png');

export const Header = (props: any)=>(<Navbar>
            <Login {...props} />
            <ErrorMessage />
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
                <RightNavBar {...props} />
            </Navbar.Collapse>
        </Navbar>);