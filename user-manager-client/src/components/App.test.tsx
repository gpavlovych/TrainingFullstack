import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import Routes from "./Routes";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()})
describe("App component", ()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it("has 1 provider and 1 route", () => {
        const wrapper = enzyme.shallow(<App />);
        expect(wrapper.find(Provider)).toHaveLength(1);
        expect(wrapper.find(Routes)).toHaveLength(1);
    });
});