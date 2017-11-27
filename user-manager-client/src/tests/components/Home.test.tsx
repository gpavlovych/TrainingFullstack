import * as React from 'react';
import Home from "../../components/Home/Home";
import {Header} from "../../components/Header/Header";
import {Provider} from "react-redux";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("Home component", ()=>{
    it("renders correctly", () => {
        const  props = {currentUserToken: true, users: [{_id: "someid", name: "name"}]};

        const store: any = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => (props)
        };
        const propsHistory: any = {history: "somehistory"};
        const  wrapper = enzyme.mount(<Provider store={store}><Home {...propsHistory}/></Provider>);
        expect(wrapper.find(Header)).toHaveLength(1);
        expect(wrapper.find(Header).at(0).props().history).toEqual(propsHistory.history);
        expect(wrapper.find(UserProfileItem)).toHaveLength(props.users.length);
        for (let userIndex = 0; userIndex < props.users.length; userIndex++) {
            expect(wrapper.find(UserProfileItem).at(userIndex).props().name).toEqual(props.users[userIndex].name);
        }
    });
});