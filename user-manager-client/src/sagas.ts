import {call, fork, put, race, take} from "redux-saga/effects";
import {CHANGE_FORM, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, REGISTER_REQUEST, SET_AUTH} from "./actions";
import history from "./history";
export function *authorize(data: any){
    console.log("authorize "+JSON.stringify(data));
    yield put({type: LOGIN_SUCCESS});

}

export function *logout () {
    console.log("logout");
    yield put({type: LOGOUT_SUCCESS});
}

export function * loginFlow (): IterableIterator<any> {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const request = yield take(LOGIN_REQUEST);
        const {username, password} = request.data;

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        const winner = yield race({
            auth: call(authorize, {username, password, isRegistering: false}),
            logout: take(LOGOUT)
        });

        // If `authorize` was the winner...
        if (winner.auth) {
            // ...we send Redux appropiate actions
            yield put({type: SET_AUTH, newAuthState: true});// User is logged in (authorized)
            yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
           history.push('/dashboard'); // Go to dashboard page
        }
    }
}

export function * registerFlow () {
    while (true) {
        // We always listen to `REGISTER_REQUEST` actions
        const request = yield take(REGISTER_REQUEST);
        const {username, password} = request.data;

        // We call the `authorize` task with the data, telling it that we are registering a user
        // This returns `true` if the registering was successful, `false` if not
        const wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

        // If we could register a user, we send the appropiate actions
        if (wasSuccessful) {
            yield put({type: LOGIN_SUCCESS});
            yield put({type: SET_AUTH, newAuthState: true}); // User is logged in (authorized) after being registered
            yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}); // Clear form
            history.push('/dashboard'); // Go to dashboard page
        }
    }
}

export function * logoutFlow () {
    while (true) {
        yield take(LOGOUT);
        yield put({type: SET_AUTH, newAuthState: false});

        yield call(logout);
        yield put({type: LOGOUT_SUCCESS});
        history.push('/');
    }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(registerFlow);
}