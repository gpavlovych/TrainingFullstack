import * as React from 'react';
import {ImageUploader} from "./ImageUploader";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("ImageUploader component", ()=>{
    it("contains all necessary components", () => {
        const onChangeMock = jest.fn();
        const  wrapper = enzyme.shallow(<ImageUploader file={require("./WelcomeBackground.jpg")} onChange={(file)=>onChangeMock()} />);
        expect(wrapper.find("label")).toHaveLength(1);
        expect(wrapper.find("div")).toHaveLength(1);
        expect(wrapper.find("img")).toHaveLength(1);
        expect(wrapper.find("input")).toHaveLength(1);
    });
});