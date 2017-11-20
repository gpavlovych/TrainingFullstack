import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";

class Home extends React.Component<any> {

    private static getUserItem(){
        return <label>Hi there</label>
    }

    render() {
        let users = ['','',''];
        return <div><Header {...this.props}></Header>{users.map(Home.getUserItem)}</div>;
    }
}

function select (state: any) {
    return {
        data: state
    }
}

export default connect(select)(Home);