import * as React from "react";
import {Button, Thumbnail} from "react-bootstrap";
const img = require("../neutral male.jpg");

export default (()=>(
    <Thumbnail src={img} alt="100x100">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
            <Button bsStyle="primary">Button</Button>&nbsp;
            <Button bsStyle="default">Button</Button>
        </p>
    </Thumbnail>));