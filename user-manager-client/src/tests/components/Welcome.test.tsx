import * as React from 'react';
import {Welcome} from "../../components/Welcome/Welcome";
import {Header} from "../../components/Header/Header";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("Welcome component", ()=>{
    it("contains Header and div", ()=> {
        const props = {
            history: "props"
        };
        const wrapper = enzyme.shallow(<Welcome {...props} />);
        const rootDiv = wrapper.find("div");
        expect(rootDiv.find(Header).props().history).toEqual(props.history);
        expect(rootDiv.find("div.welcomeScreen")).toHaveLength(1);
    });
});