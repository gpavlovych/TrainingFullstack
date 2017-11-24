import * as React from 'react';
import {Route, Switch} from "react-router";
import Routes from "./Routes";
import {BrowserRouter} from "react-router-dom";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("Routes component", ()=>{
    it("contains all necessary routes", () => {
        const wrapper = enzyme.shallow(<Routes />);
        let routes = wrapper.find(BrowserRouter).find(Switch).find(Route);
        console.log(routes);
        expect(routes).toHaveLength(2);
        expect(routes.at(0).props().path).toEqual("/");
        expect(routes.at(0).props().exact).toBeTruthy();
        expect(routes.at(1).props().path).toEqual("/dashboard");
        expect(routes.at(1).props().exact).toBeTruthy();
    });
});