import * as React from 'react';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {NavDropdown, NavItem} from "react-bootstrap";
import {Header} from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import RightNavBar from "../../components/RightNavBar/RightNavBar";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("Header component", ()=>{
    it("contains login, errormessage and rightnavbar, with history", ()=>{
        const props={history:"1"};
        const wrapper = enzyme.shallow(<Header {...props} />);
        expect(wrapper.find(Login)).toHaveLength(1);
        expect(wrapper.find(Login).at(0).props().history).toEqual(props.history);
        expect(wrapper.find(ErrorMessage)).toHaveLength(1);
        expect(wrapper.find(RightNavBar)).toHaveLength(1);
        expect(wrapper.find(RightNavBar).at(0).props().history).toEqual(props.history);
    });

    it("rendered correctly", ()=>{
        const props={history:"1"};
        const wrapper = enzyme.shallow(<Header {...props} />);
        expect(wrapper.find("a.navbar-brand").at(0).text()).toEqual("Auth03");
        const dropdowns = wrapper.find(NavDropdown);
        expect(dropdowns.at(0).props().title).toEqual("Platform");
        expect(dropdowns.at(1).props().title).toEqual("Solutions");
        expect(dropdowns.at(2).props().title).toEqual("Why Auth0?");
        expect(dropdowns.at(3).props().title).toEqual("Developers");
        const items = wrapper.find(NavItem);
        console.log(items.at(0));
        expect(items.at(0).props().children).toEqual("Pricing");
        expect(items.at(1).props().children).toEqual("Talk to Sales");
    });
});