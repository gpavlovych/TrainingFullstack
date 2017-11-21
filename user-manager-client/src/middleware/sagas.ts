import {call, fork, put, race, take} from "redux-saga/effects";
import {getUsers, login, register} from "./api";
import {TypeKeys} from "./actions";

export function * loginFlow (): IterableIterator<any> {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const action = yield take(TypeKeys.LOGIN_REQUEST_ACTION);
        const {email, password, callback} = action;

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        const winner = yield race({
            loginResponse: call(login, {username: email, password}),
            logout: take(TypeKeys.LOGOUT_REQUEST_ACTION)
        });

        // If `authorize` was the winner...
        if (winner.loginResponse) {
            // ...we send Redux appropiate actions
            yield put({type: TypeKeys.LOGIN_SUCCESS_ACTION, username: winner.loginResponse.username, token: winner.loginResponse.token});// User is logged in (authorized)
            yield put({type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION});
         //   yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}});// Clear form
            callback(); // Go to dashboard page
        }
    }
}

export function * registerFlow () {
    while (true) {
        // We always listen to `REGISTER_REQUEST` actions
        const action = yield take(TypeKeys.REGISTER_REQUEST_ACTION);
        const {username, email, password, callback} = action;

        // We call the `authorize` task with the data, telling it that we are registering a user
        // This returns `true` if the registering was successful, `false` if not
        const registerResponse = yield call(register, {username, email, password});

        // If we could register a user, we send the appropiate actions
        if (registerResponse) {
            yield put({
                type: TypeKeys.REGISTER_SUCCESS_ACTION,
                username: registerResponse.username,
                password: registerResponse.password,
                email: registerResponse.email
            });
            yield put({type: TypeKeys.LOGIN_REQUEST_ACTION, email, password, callback});
        }
    }
}

export function * logoutFlow () {
    while (true) {
        const {callback}= yield take(TypeKeys.LOGOUT_REQUEST_ACTION);
        yield put ({type: TypeKeys.LOGOUT_SUCCESS_ACTION});
        callback();
    }
}

export function * getAllUsersFlow(){
    while (true) {
        const {token} = yield take(TypeKeys.GET_USERS_REQUEST_ACTION);
        const usersResponse = yield call(getUsers, token);
        yield put ({type: TypeKeys.GET_USERS_SUCCESS_ACTION, users: usersResponse});
    }
}
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(registerFlow);
    yield fork(getAllUsersFlow);
}