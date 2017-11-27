import {
    createCloseSignInFormAction, createCloseSignUpFormAction,
    createGetUserRequestAction, createGetUsersSuccessAction, createLoginRequestAction, createLoginSuccessAction,
    createLogoutRequestAction, createLogoutSuccessAction, createOpenErrorMessageAction, createOpenSignInFormAction,
    createOpenSignUpFormAction,
    createRegisterRequestAction,
    createRegisterSuccessAction,
    TypeKeys,
    createCloseErrorMessageAction
} from "../../middleware/actions";

describe("actions",()=> {
    it("GetUsersRequestAction", () => {
        const expectedToken = "someToken";
        const action = createGetUserRequestAction(expectedToken);
        expect(action.type).toBe(TypeKeys.GET_USERS_REQUEST_ACTION);
        expect(action.token).toBe(expectedToken);
    });

    it("GetUsersSuccessAction", () => {
        const expectedUsers = [{id: "123", name: "123"}, {id: "test", name: "test"}];
        const action = createGetUsersSuccessAction(expectedUsers);
        expect(action.type).toBe(TypeKeys.GET_USERS_SUCCESS_ACTION);
        expect(action.users).toBe(expectedUsers);
    });

    it("LoginRequestAction", () => {
        const expectedEmail = "someemail@ex";
        const expectedPassword = "somepwd";
        const expectedCallback = () => {};
        const action = createLoginRequestAction(expectedEmail, expectedPassword, expectedCallback);
        expect(action.type).toBe(TypeKeys.LOGIN_REQUEST_ACTION);
        expect(action.email).toBe(expectedEmail);
        expect(action.password).toBe(expectedPassword);
        expect(action.callback).toBe(expectedCallback);
    });

    it("LoginSuccessAction", () => {
        const expectedUserId = "userId";
        const expectedToken = "token";
        const expectedUserFirstName = "userFirstName";
        const expectedUserLastName = "userLastName";
        const expectedUserPosition = "userPosition";
        const expectedUserEmail = "UserEmail";
        const action = createLoginSuccessAction(expectedUserId, expectedUserFirstName, expectedUserLastName, expectedUserPosition, expectedToken, expectedUserEmail);
        expect(action.type).toBe(TypeKeys.LOGIN_SUCCESS_ACTION);
        expect(action.userId).toBe(expectedUserId);
        expect(action.userFirstName).toBe(expectedUserFirstName);
        expect(action.userLastName).toBe(expectedUserLastName);
        expect(action.userPosition).toBe(expectedUserPosition);
        expect(action.token).toBe(expectedToken);
    });

    it("LogoutRequestAction", () => {
        const expectedCallback = () => {};
        const action = createLogoutRequestAction(expectedCallback);
        expect(action.type).toBe(TypeKeys.LOGOUT_REQUEST_ACTION);
        expect(action.callback).toBe(expectedCallback);
    });

    it("LogoutSuccessAction", () => {
        const action = createLogoutSuccessAction();
        expect(action.type).toBe(TypeKeys.LOGOUT_SUCCESS_ACTION);
    });

    it("RegisterRequestAction", () => {
        const expectedUserPhoto = "somephoto";
        const expectedFirstName = "someemail@ex";
        const expectedLastName = "someemail@ex";
        const expectedPosition = "someemail@ex";
        const expectedEmail = "someemail@ex";
        const expectedPassword = "somepwd";
        const expectedCallback = () => {};
        const action = createRegisterRequestAction(expectedUserPhoto, expectedFirstName, expectedLastName, expectedPosition, expectedEmail, expectedPassword, expectedCallback);
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
        const action = createRegisterSuccessAction();
        expect(action.type).toBe(TypeKeys.REGISTER_SUCCESS_ACTION);
    });

    it("CloseSignInFormAction", () => {
        const action = createCloseSignInFormAction();
        expect(action.type).toBe(TypeKeys.CLOSE_SIGNIN_FORM_ACTION);
    });

    it("CloseSignInFormAction", () => {
        const action = createCloseSignUpFormAction();
        expect(action.type).toBe(TypeKeys.CLOSE_SIGNUP_FORM_ACTION);
    });

    it("OpenSignUpFormAction", () => {
        const action = createOpenSignUpFormAction();
        expect(action.type).toBe(TypeKeys.OPEN_SIGNUP_FORM_ACTION);
    });

    it("OpenSignInFormAction", () => {
        const action = createOpenSignInFormAction();
        expect(action.type).toBe(TypeKeys.OPEN_SIGNIN_FORM_ACTION);
    });

    it("OpenErrorMessageAction", () => {
        const expectedErrorMessage = "some error message";
        const action = createOpenErrorMessageAction(expectedErrorMessage);
        expect(action.type).toBe(TypeKeys.OPEN_ERROR_MESSAGE_ACTION);
        expect(action.errorMessage).toBe(expectedErrorMessage);
    });

    it("CloseErrorMessageAction", () => {
        const action = createCloseErrorMessageAction();
        expect(action.type).toBe(TypeKeys.CLOSE_ERROR_MESSAGE_ACTION);
    });
});