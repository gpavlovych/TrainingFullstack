import {call, fork, put, race, take} from "redux-saga/effects";
import {getUsers, login, register} from "./api";
import {
    createCloseSignInFormAction, createCloseSignUpFormAction, createGetUsersSuccessAction, createLoginSuccessAction,
    createLogoutSuccessAction, createOpenErrorMessageAction,
    TypeKeys
} from "./actions";

export function * loginFlow (): IterableIterator<any> {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const action = yield take(TypeKeys.LOGIN_REQUEST_ACTION);
        const {email, password, callback} = action;
        try
        {
            // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
            // lead to a race condition. This is unlikely, but just in case, we call `race` which
            // returns the "winner", i.e. the one that finished first
            const winner = yield race({
                loginResponse: call(login, {email, password}),
                logout: take(TypeKeys.LOGOUT_REQUEST_ACTION)
            });

            if (winner.loginResponse) {
                const {_id, firstName, lastName, position, token} = winner.loginResponse;
                debugger;
                yield put(createLoginSuccessAction(_id, firstName, lastName, position, token));
                yield put(createCloseSignInFormAction());
                callback();
            }
        }
        catch (error) {
            debugger;
            yield put(createOpenErrorMessageAction(error));
        }
    }
}

export function * registerFlow () {
    while (true) {
        // We always listen to `REGISTER_REQUEST` actions
        const action = yield take(TypeKeys.REGISTER_REQUEST_ACTION);
        const {email, password, firstName, lastName, position, userPhoto, callback} = action;
        try
        {
            // We call the `authorize` task with the data, telling it that we are registering a user
            // This returns `true` if the registering was successful, `false` if not
            const registerResponse = yield call(register, {email, password, firstName, lastName, position, userPhoto});

            // If we could register a user, we send the appropiate actions
            if (registerResponse) {
                const loginResponse = yield call(login, {email, password});
                if (loginResponse) {
                    const {_id, firstName, lastName, position, token} = loginResponse;

                    yield put(createLoginSuccessAction(_id, firstName, lastName, position, token));// User is logged in (authorized)
                    yield put(createCloseSignUpFormAction());
                    callback(); // Go to dashboard page
                }
            }
        }
        catch (error) {
           yield put(createOpenErrorMessageAction(error));
        }
    }
}

export function * logoutFlow () {
    while (true) {
        const {callback}= yield take(TypeKeys.LOGOUT_REQUEST_ACTION);
        yield put (createLogoutSuccessAction());
        callback();
    }
}

export function * getAllUsersFlow() {
    while (true) {
        const {token} = yield take(TypeKeys.GET_USERS_REQUEST_ACTION);
        try {
            const usersResponse = yield call(getUsers, {token});
            yield put(createGetUsersSuccessAction(usersResponse));
        }
        catch(error) {
            yield put(createOpenErrorMessageAction(error));
        }
    }
}
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(registerFlow);
    yield fork(getAllUsersFlow);
}