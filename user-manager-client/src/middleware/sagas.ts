import { call, fork, put, race, take } from 'redux-saga/effects';
import { getUsers, login, register } from './api';
import {
    createCloseSignInFormAction, createCloseSignUpFormAction, createGetUsersSuccessAction, createLoginSuccessAction,
    createLogoutSuccessAction, createOpenErrorMessageAction,
    TypeKeys
} from './actions';

export function * loginFlow () {
    while (true) {
        const {email, password, callback} =  yield take(TypeKeys.LOGIN_REQUEST_ACTION);
        try {
            const winner = yield race({
                loginResponse: call(login, {email, password}),
                logout: take(TypeKeys.LOGOUT_REQUEST_ACTION)
            });

            if (winner.loginResponse) {
                const {_id, firstName, lastName, position, token} = winner.loginResponse;
                yield put(createLoginSuccessAction(_id, firstName, lastName, position, token, email));
                yield put(createCloseSignInFormAction());
                callback();
            }
        } catch (error) {
            yield put(createOpenErrorMessageAction(error));
        }
    }
}

export function * registerFlow () {
    while (true) {
        const action = yield take(TypeKeys.REGISTER_REQUEST_ACTION);
        const {email, password, firstName, lastName, position, userPhoto, callback} = action;
        try {
            const registerResponse = yield call(register, {email, password, firstName, lastName, position, userPhoto});

            if (registerResponse) {
                const loginResponse = yield call(login, {email, password});
                if (loginResponse) {
                    const {_id, token} = loginResponse;
                    yield put(createLoginSuccessAction(_id, firstName, lastName, position, token, email));
                    yield put(createCloseSignUpFormAction());
                    callback(); 
                }
            }
        } catch (error) {
           yield put(createOpenErrorMessageAction(error));
        }
    }
}

export function * logoutFlow () {
    while (true) {
        const { callback } = yield take(TypeKeys.LOGOUT_REQUEST_ACTION);
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
        } catch (error) {
            yield put(createOpenErrorMessageAction(error));
        }
    }
}

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(logoutFlow);
    yield fork(registerFlow);
    yield fork(getAllUsersFlow);
}