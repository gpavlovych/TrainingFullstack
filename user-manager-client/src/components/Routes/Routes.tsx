import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import {Welcome} from "../Welcome/Welcome";

export default () =>
    (<BrowserRouter>
        <Switch>
            <Route path="/" exact render={props => <Welcome {...props} />} />
            <Route path="/dashboard" exact render={props => <Home {...props} />} />
        </Switch>
    </BrowserRouter>);