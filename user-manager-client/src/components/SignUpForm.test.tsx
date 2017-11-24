import * as React from 'react';
import {Button, Form, FormControl, FormGroup, Glyphicon, InputGroup} from "react-bootstrap";
import {SignUpForm} from "./SignUpForm";
import {ImageUploader} from "./ImageUploader";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("SignUpForm component", () => {
    it("contains all necessary form groups", () => {
        const submitMock = jest.fn();
        const wrapper = enzyme.shallow(<SignUpForm  submit={(userPhoto: any,
                                                             position: string,
                                                             firstName: string,
                                                             lastName: string,
                                                             email: string,
                                                             password: string) => {
            submitMock(userPhoto,
                position,
                firstName,
                lastName,
                email,
                password);
        }} />);
        let formGroups = wrapper.find(Form).find(FormGroup);
        let inputGroup0 = formGroups.at(0).find(InputGroup);
        expect(inputGroup0.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("camera");
        expect(inputGroup0.find(ImageUploader)).toHaveLength(1);

        let inputGroup1 = formGroups.at(1).find(InputGroup);
        expect(inputGroup1.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("briefcase");
        let formControl1 = inputGroup1.find(FormControl);
        expect(formControl1.props().type).toEqual("text");
        expect(formControl1.props().placeholder).toEqual("Position");
        expect(formControl1.props().name).toEqual("position");

        let inputGroup2 = formGroups.at(2).find(InputGroup);
        expect(inputGroup2.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("user");
        let formControl2 = inputGroup2.find(FormControl);
        expect(formControl2.props().type).toEqual("text");
        expect(formControl2.props().placeholder).toEqual("First Name");
        expect(formControl2.props().name).toEqual("firstName");

        let inputGroup3 = formGroups.at(3).find(InputGroup);
        expect(inputGroup3.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("user");
        let formControl3 = inputGroup3.find(FormControl);
        expect(formControl3.props().type).toEqual("text");
        expect(formControl3.props().placeholder).toEqual("Last Name");
        expect(formControl3.props().name).toEqual("lastName");

        let inputGroup4 = formGroups.at(4).find(InputGroup);
        expect(inputGroup4.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("envelope");
        let formControl4 = inputGroup4.find(FormControl);
        expect(formControl4.props().type).toEqual("text");
        expect(formControl4.props().placeholder).toEqual("Work Email");
        expect(formControl4.props().name).toEqual("email");

        let inputGroup5 = formGroups.at(5).find(InputGroup);
        expect(inputGroup5.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("lock");
        let formControl5 = inputGroup5.find(FormControl);
        expect(formControl5.props().type).toEqual("password");
        expect(formControl5.props().placeholder).toEqual("Your Password");
        expect(formControl5.props().name).toEqual("password");

        let inputGroup6 = formGroups.at(6).find(InputGroup);
        expect(inputGroup6.find(InputGroup.Addon).find(Glyphicon).props().glyph).toEqual("lock");
        let formControl6 = inputGroup6.find(FormControl);
        expect(formControl6.props().type).toEqual("password");
        expect(formControl6.props().placeholder).toEqual("Confirm Password");
        expect(formControl6.props().name).toEqual("confirmPassword");

        let button = formGroups.at(7).find(InputGroup).find(Button);
        expect(button.props().children[0]).toEqual("Register");
    });
});