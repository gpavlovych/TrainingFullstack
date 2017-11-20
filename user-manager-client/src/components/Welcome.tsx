import * as React from "react";
const Background = require("../logo.jpg");

export class Welcome extends React.Component {
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

        return <div style={sectionStyle}></div>;
    }
}