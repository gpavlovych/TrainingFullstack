import * as React from "react";
import './UserProfileItem.css';

export default ((props: any)=>(
    <div className="tileContainer">
        <a className="photoContainer">
            <img src={`http://localhost:4245/api/v1/users/${props._id}/photo`} width={150}/>
        </a>
        <h3>{props.firstName} {props.lastName}</h3>
        <p>{props.position}</p>
    </div>));