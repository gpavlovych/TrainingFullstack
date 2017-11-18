import * as React from "react";

export class Home extends React.Component {

    private static getUserItem(){
        return <label>Hi there</label>
    }

    render() {
        let users = ['','',''];
        return users.map(Home.getUserItem);
    }
}