//import rootSaga from "./sagas";

import rootSaga, {getAllUsersFlow, loginFlow, logoutFlow, registerFlow} from "./sagas";
import {TypeKeys} from "./actions";
import {call, take} from "redux-saga/effects";
import {getUsers, login, register} from "./api";

const expectSaga  = require('redux-saga-test-plan');

describe("sagas testing", ()=> {
    it("rootSaga", () => {
        expectSaga.testSaga(rootSaga)
            .next()
            .fork(loginFlow)
            .next()
            .fork(logoutFlow)
            .next()
            .fork(registerFlow)
            .next()
            .fork(getAllUsersFlow)
            .next()
            .isDone();
    });

    it("loginFlow", () => {
        let _id = "s";
        let firstName = "s";
        let lastName = "s";
        let email = "email";
        let position = "someposition";
        let token = "sometoken";
        let password = "pwd";
        let callback= jest.fn();
        expectSaga.testSaga(loginFlow)
            .next()
            .take(TypeKeys.LOGIN_REQUEST_ACTION,)
            .next({email, password, callback})
            .race({loginResponse: call(login, {email, password}), logout: take(TypeKeys.LOGOUT_REQUEST_ACTION)})
            .next({loginResponse: {_id, firstName, lastName, position, token, email}})
            .put({
                type: TypeKeys.LOGIN_SUCCESS_ACTION,
                userId: _id,
                userFirstName: firstName,
                userLastName: lastName,
                userPosition: position,
                token,
                userEmail: email
            })
            .next()
            .put({type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION})
            .next();
        expect(callback).toHaveBeenCalled();
    });

    it("registerFlow", () => {
        let _id = "s";
        let firstName = "s";
        let lastName = "s";
        let email = "email";
        let position = "someposition";
        let token = "sometoken";
        let password = "pwd";
        let userPhoto = "somephoto";
        let callback = jest.fn();
        expectSaga.testSaga(registerFlow)
            .next()
            .take(TypeKeys.REGISTER_REQUEST_ACTION)
            .next({email, password, firstName, lastName, position, userPhoto, callback})
            .call(register, {email, password, firstName, lastName, position, userPhoto})
            .next(true)
            .call(login, {email, password})
            .next({_id, firstName, lastName, position, token})
            .put({type: TypeKeys.LOGIN_SUCCESS_ACTION, userId: _id, userFirstName: firstName, userLastName: lastName, userPosition: position, token, userEmail: email })
            .next()
            .put({type: TypeKeys.CLOSE_SIGNUP_FORM_ACTION})
            .next();
        expect(callback).toHaveBeenCalled();
    });

    it("logoutFlow", () => {
        let callbackMock = jest.fn();
        expectSaga.testSaga(logoutFlow)
            .next()
            .take(TypeKeys.LOGOUT_REQUEST_ACTION)
            .next({callback: callbackMock})
            .put({type: TypeKeys.LOGOUT_SUCCESS_ACTION})
            .next();
        expect(callbackMock).toHaveBeenCalled();
    });

    it("getAllUsersFlow", () => {
        let token = "sometoken";
        expectSaga.testSaga(getAllUsersFlow)
            .next()
            .take(TypeKeys.GET_USERS_REQUEST_ACTION)
            .next({token})
            .call(getUsers, {token})
            .next();
    });
});