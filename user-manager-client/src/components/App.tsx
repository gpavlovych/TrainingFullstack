import * as React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "../middleware/store";
import Routes from "./Routes";

export default ()=>(
    <Provider store={store}>
        <Routes/>
    </Provider>);