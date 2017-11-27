import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import { Welcome } from '../Welcome/Welcome';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} render={props => <Welcome {...props} />} />
            <Route path="/dashboard" exact={true} render={props => <Home {...props} />} />
        </Switch>
    </BrowserRouter>
);