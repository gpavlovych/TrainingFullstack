import * as React from 'react';
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";

const enzyme = require("enzyme");
const adapter =  require('enzyme-adapter-react-16');
enzyme.configure({adapter: new adapter()});

describe("UserProfileItem component", ()=>{
    it("contains login, errormessage and rightnavbar, with history", ()=> {
        const props = {
            _id: 1,
            firstName: "someFirstName",
            lastName: "someLastName",
            position: "somePosition"
        };
        const wrapper = enzyme.shallow(<UserProfileItem {...props} />);
        const div = wrapper.find("div");
        expect(div.find("a").find("img").props().src).toEqual(`http://localhost:4245/api/v1/users/${props._id}/photo`);
        const h3children = wrapper.find("div").find("h3").props().children;
        expect(h3children[0]).toEqual(props.firstName);
        expect(h3children[1]).toEqual(" ");
        expect(h3children[2]).toEqual(props.lastName);
        expect(div.find("p").props().children).toEqual(props.position);
    });
});