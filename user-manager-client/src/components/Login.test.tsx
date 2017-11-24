import * as React from 'react';
import {Modal, Tab} from "react-bootstrap";
import {Provider} from "react-redux";
import Login from "./Login";
import {SignInForm} from "./SignInForm";
import {SignUpForm} from './SignUpForm';

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("Login component", ()=>{
    it("visible as sign in", () => {
        const  props = {isSignInFormOpened: true, isSignUpFormOpened: false};
        const store: any = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        };
        const  wrapper = enzyme.mount(<Provider store={store}><Login history={" "} /></Provider>);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Modal).at(0).props().show).toBeTruthy();
        expect(wrapper.find(Modal.Header)).toHaveLength(1);
        expect(wrapper.find(Modal.Title)).toHaveLength(1);
        expect(wrapper.find(Modal.Body)).toHaveLength(1);
        expect(wrapper.find(Modal.Body).at(0).find(Tab.Container).props().activeKey).toBe("signIn");
        expect(wrapper.find(SignInForm)).toHaveLength(1);
        expect(wrapper.find(SignUpForm)).toHaveLength(1);
    });

    it("visible as sign up", () => {
        const  props = {isSignInFormOpened: false, isSignUpFormOpened: true};
        const store: any = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        };
        const  wrapper = enzyme.mount(<Provider store={store}><Login history={" "} /></Provider>);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Modal).at(0).props().show).toBeTruthy();
        expect(wrapper.find(Modal.Header)).toHaveLength(1);
        expect(wrapper.find(Modal.Title)).toHaveLength(1);
        expect(wrapper.find(Modal.Body)).toHaveLength(1);
        expect(wrapper.find(Modal.Body).at(0).find(Tab.Container).props().activeKey).toBe("signUp");
        expect(wrapper.find(SignInForm)).toHaveLength(1);
        expect(wrapper.find(SignUpForm)).toHaveLength(1);
    });

    it("invisible", () => {
        const  props = {isSignInFormOpened: false, isSignUpFormOpened: false};
        const store: any = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        };
        const  wrapper = enzyme.mount(<Provider store={store}><Login history={" "} /></Provider>);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Modal).at(0).props().show).toBeFalsy();
    });
});