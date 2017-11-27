import * as React from "react";
import {Header} from "../Header/Header";
import './Welcome.css'

export const Welcome = (props: any) => (<div><Header {...props} /><div className="welcomeScreen" /></div>);