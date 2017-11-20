import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './middleware/registerServiceWorker';
import './index.css';
import { Route, Switch} from "react-router";
import {Home} from "./components/Home";
import {Provider} from "react-redux";
import {State, default as reducer} from "./middleware/reducers";

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./middleware/sagas";
import {Welcome} from "./components/Welcome";
import {BrowserRouter} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const store = createStore<State>(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(
    <Provider store={store}>
        <App>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Welcome} />
                    <Route path='/dashboard' component={Home} />
                </Switch>
            </BrowserRouter>
        </App>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker()