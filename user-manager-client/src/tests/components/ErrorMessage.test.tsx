import * as React from 'react';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {Modal} from "react-bootstrap";
import {Provider} from "react-redux";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("ErrorMessage component", ()=>{
    it("visible w/error", () => {
        const expectedText = "some text";
        const  props = {isErrorMessageOpened: true, errorMessage: expectedText};
        const store: any = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        };
        const  wrapper = enzyme.mount(<Provider store={store}><ErrorMessage /></Provider>);
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Modal).at(0).props().show).toBeTruthy();
        expect(wrapper.find(Modal.Header)).toHaveLength(1);
        expect(wrapper.find(Modal.Title)).toHaveLength(1);
        expect(wrapper.find(Modal.Body)).toHaveLength(1);
        expect(wrapper.find(Modal.Body).at(0).text()).toBe(expectedText);
    });

    it("invisible", () => {
        const  props = {isErrorMessageOpened: false, errorMessage: "some text"};
        const store = {store: {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        }};
        const  wrapper = enzyme.mount(<ErrorMessage {...store}/>);
        expect(wrapper.find(Modal).at(0).props().show).toBeFalsy();
    });
});