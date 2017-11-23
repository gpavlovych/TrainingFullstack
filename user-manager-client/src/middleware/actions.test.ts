import {
    createCloseSignInFormAction, createCloseSignUpFormAction,
    createGetUserRequestAction, createGetUsersSuccessAction, createLoginRequestAction, createLoginSuccessAction,
    createLogoutRequestAction, createLogoutSuccessAction, createOpenErrorMessageAction, createOpenSignInFormAction,
    createOpenSignUpFormAction,
    createRegisterRequestAction,
    createRegisterSuccessAction,
    TypeKeys,
    createCloseErrorMessageAction
} from "./actions";

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
        expect(action.type).toBe(TypeKeys.GET_USERS_SUCCESS_ACTION);
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

    it("LoginSuccessAction", () => {
        let expectedCurrentUserId = "currentUserId";
        let expectedToken = "token";
        let expectedCurrentUserFirstName = "currentUserFirstName";
        let expectedCurrentUserLastName = "currentUserLastName";
        let expectedCurrentUserPosition = "currentUserPosition";
        let action = createLoginSuccessAction(expectedCurrentUserId, expectedCurrentUserFirstName, expectedCurrentUserLastName, expectedCurrentUserPosition, expectedToken);
        expect(action.type).toBe(TypeKeys.LOGIN_SUCCESS_ACTION);
        expect(action.currentUserId).toBe(expectedCurrentUserId);
        expect(action.currentUserFirstName).toBe(expectedCurrentUserFirstName);
        expect(action.currentUserLastName).toBe(expectedCurrentUserLastName);
        expect(action.currentUserPosition).toBe(expectedCurrentUserPosition);
        expect(action.token).toBe(expectedToken);
    });

    it("LogoutRequestAction", () => {
        let expectedCallback = () => {};
        let action = createLogoutRequestAction(expectedCallback);
        expect(action.type).toBe(TypeKeys.LOGOUT_REQUEST_ACTION);
        expect(action.callback).toBe(expectedCallback);
    });

    it("LogoutSuccessAction", () => {
        let action = createLogoutSuccessAction();
        expect(action.type).toBe(TypeKeys.LOGOUT_SUCCESS_ACTION);
    });

    it("RegisterRequestAction", () => {
        let expectedUserPhoto = "somephoto";
        let expectedFirstName = "someemail@ex";
        let expectedLastName = "someemail@ex";
        let expectedPosition = "someemail@ex";
        let expectedEmail = "someemail@ex";
        let expectedPassword = "somepwd";
        let expectedCallback = () => {};
        let action = createRegisterRequestAction(expectedUserPhoto, expectedFirstName, expectedLastName, expectedPosition, expectedEmail, expectedPassword, expectedCallback);
        expect(action.type).toBe(TypeKeys.REGISTER_REQUEST_ACTION);
        expect(action.userPhoto).toBe(expectedUserPhoto);
        expect(action.firstName).toBe(expectedFirstName);
        expect(action.lastName).toBe(expectedLastName);
        expect(action.position).toBe(expectedPosition);
        expect(action.email).toBe(expectedEmail);
        expect(action.password).toBe(expectedPassword);
        expect(action.callback).toBe(expectedCallback);
    });

    it("RegisterSuccessAction", () => {
        let action = createRegisterSuccessAction();
        expect(action.type).toBe(TypeKeys.REGISTER_SUCCESS_ACTION);
    });

    it("CloseSignInFormAction", () => {
        let action = createCloseSignInFormAction();
        expect(action.type).toBe(TypeKeys.CLOSE_SIGNIN_FORM_ACTION);
    });

    it("CloseSignInFormAction", () => {
        let action = createCloseSignUpFormAction();
        expect(action.type).toBe(TypeKeys.CLOSE_SIGNUP_FORM_ACTION);
    });

    it("OpenSignUpFormAction", () => {
        let action = createOpenSignUpFormAction();
        expect(action.type).toBe(TypeKeys.OPEN_SIGNUP_FORM_ACTION);
    });

    it("OpenSignInFormAction", () => {
        let action = createOpenSignInFormAction();
        expect(action.type).toBe(TypeKeys.OPEN_SIGNIN_FORM_ACTION);
    });

    it("OpenErrorMessageAction", () => {
        let expectedErrorMessage = "some error message";
        let action = createOpenErrorMessageAction(expectedErrorMessage);
        expect(action.type).toBe(TypeKeys.OPEN_ERROR_MESSAGE_ACTION);
        expect(action.errorMessage).toBe(expectedErrorMessage);
    });

    it("CloseErrorMessageAction", () => {
        let action = createCloseErrorMessageAction();
        expect(action.type).toBe(TypeKeys.CLOSE_ERROR_MESSAGE_ACTION);
    });
});