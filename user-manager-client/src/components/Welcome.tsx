import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";
const Background = require("../logo.jpg");

class Welcome extends React.Component<any> {
    render() {

        let sectionStyle = {
            width: "100%",
            height: "500px",
            top: "0",
            left: "0",
            zIndex: -1,
            backgroundSize: "cover",
            backgroundImage: `url(${Background})`
        };

        return <div><Header {...this.props}></Header><div style={sectionStyle}></div></div>;
    }
}
function select (state: any) {
    return {
        data: state
    }
}

export default connect(select)(Welcome);