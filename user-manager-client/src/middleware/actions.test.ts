import {createGetUserRequestAction, createGetUsersSuccessAction, createLoginRequestAction, TypeKeys} from "./actions";

describe("actions",()=> {
    it("GetUsersRequestAction", () => {
        let expectedToken = "someToken";
        let action = createGetUserRequestAction(expectedToken);
        expect(action.type).toBe(TypeKeys.GET_USERS_REQUEST_ACTION);
        expect(action.token).toBe(expectedToken);
    });

    it("GetUsersSuccessAction", () => {
        let expectedUsers = [{id: "123", name: "123"}, {id: "test", name: "test"}];
        let action = createGetUsersSuccessAction(expectedUsers);
        expect(action.type).toBe(TypeKeys.GET_USERS_REQUEST_ACTION);
        expect(action.users).toBe(expectedUsers);
    });

    it("LoginRequestAction", () => {
        let expectedEmail = "someemail@ex";
        let expectedPassword = "somepwd";
        let expectedCallback = () => {};
        let action = createLoginRequestAction(expectedEmail, expectedPassword, expectedCallback);
        expect(action.type).toBe(TypeKeys.LOGIN_REQUEST_ACTION);
        expect(action.email).toBe(expectedEmail);
        expect(action.password).toBe(expectedPassword);
        expect(action.callback).toBe(expectedCallback);
    });

    it("")
});