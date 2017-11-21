import * as React from "react";
import './UserProfileItem.css';
const img = require("../neutral male.jpg");

export default ((props: any)=>(
    <div className="tileContainer">
        <a className="photoContainer">
            <img src={img} width={150}/>
        </a>
        <h3>John Doe</h3>
        <p>Senior software developer</p>
    </div>));