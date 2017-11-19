import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Route, Router, Switch} from "react-router";
import {Home} from "./Home";
import {Provider} from "react-redux";
import {IRegistrationState, default as reducer} from "./reducers";

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas";
import {Welcome} from "./Welcome";
const sagaMiddleware = createSagaMiddleware();
const store = createStore<IRegistrationState>(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <App>
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Welcome} />
                    <Route path='/dashboard' component={Home} />
                </Switch>
            </Router>
        </App>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
