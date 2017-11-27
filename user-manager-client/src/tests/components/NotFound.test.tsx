import * as React from 'react';
import NotFound from "../../components/NotFound/NotFound";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});
describe("NotFound component", ()=>{
    it("has the correct text", () => {
        const wrapper = enzyme.shallow(<NotFound />);
        expect(wrapper.find("h1").at(0).props().children).toEqual("Not found");
    });
});