import * as React from 'react';
import {Button, Form, FormControl, FormGroup, Glyphicon, InputGroup} from "react-bootstrap";
import {SignInForm} from "./SignInForm";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("SignInForm component", () => {
    it("contains all necessary form groups", () => {
        const submitMock = jest.fn();
        const wrapper = enzyme.shallow(<SignInForm  submit={(email: string,
                                                             password: string) => {
            submitMock(email, password);
        }} />);
        let formGroups = wrapper.find(Form).find(FormGroup);
        let inputGroup0 = formGroups.at(0).find(InputGroup);
        expect(inputGroup0.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("envelope");
        let formControl0 = inputGroup0.find(FormControl);
        expect(formControl0.props().type).toEqual("text");
        expect(formControl0.props().placeholder).toEqual("Work Email");
        expect(formControl0.props().name).toEqual("email");

        let inputGroup1 = formGroups.at(1).find(InputGroup);
        expect(inputGroup1.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("lock");
        let formControl1 = inputGroup1.find(FormControl);
        expect(formControl1.props().type).toEqual("password");
        expect(formControl1.props().placeholder).toEqual("Your Password");
        expect(formControl1.props().name).toEqual("password");

        expect(formGroups.at(2).find(FormControl.Static).props().children).toEqual("Don't remember your password?");
        let button = formGroups.at(3).find(InputGroup).find(Button);
        expect(button.props().children[0]).toEqual("Login");
    });
});