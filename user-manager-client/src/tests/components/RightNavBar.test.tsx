import * as React from 'react';
import {Button, NavItem} from "react-bootstrap";
import {Provider} from "react-redux";
import RightNavBar from "../../components/RightNavBar/RightNavBar";
import {createOpenSignInFormAction, createOpenSignUpFormAction} from "../../middleware/actions";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("RightNavBar component", ()=>{
    it("logged in", () => {
        const dispatchMock = jest.fn();
        const props = {
            currentUserFirstName: "john",
            currentUserLastName: "doe",
            currentUserToken: "some token"
        };
        const store: any = {
            subscribe: () => {
            },
            dispatch: (it: any) =>  dispatchMock(it),
            getState: () => (props)
        };
        const wrapper = enzyme.mount(<Provider store={store}><RightNavBar /></Provider>);
        expect(wrapper.find(NavItem).at(0).props().children[0]).toEqual("Welcome, ");
        expect(wrapper.find(NavItem).at(0).find("b").props().children).toEqual([props.currentUserFirstName, " ", props.currentUserLastName]);
        expect(wrapper.find(NavItem).at(0).props().children[2]).toEqual("!");
        expect(wrapper.find(NavItem).at(1).find(Button).props().children).toEqual("Logout");
        const button = wrapper.find("NavItem").at(1).find(Button).last();
        button.simulate("click");
        expect(dispatchMock).toHaveBeenCalled();
    });

    it("logged out", () => {
        const dispatchMock = jest.fn();
        const props = {
            currentUserFirstName: "",
            currentUserLastName: "",
            currentUserToken: "",
        };
        const store: any = {
            subscribe: () => {
            },
            dispatch: (it: any) => dispatchMock(it),
            getState: () => (props)
        };
        const wrapper = enzyme.mount(<Provider store={store}><RightNavBar /></Provider>);
        const loginButton = wrapper.find("NavItem").at(0).find(Button).last();
        expect(loginButton.props().children).toEqual("Log in");
        loginButton.simulate("click");
        expect(dispatchMock).toHaveBeenCalledWith(createOpenSignInFormAction());

        const registerButton = wrapper.find("NavItem").at(1).find(Button).last();
        expect(registerButton.props().children).toEqual("Register");
        registerButton.simulate("click");
        expect(dispatchMock).toHaveBeenCalledWith(createOpenSignUpFormAction());
    });
});