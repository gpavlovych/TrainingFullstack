import reducer, { RootState } from "../../middleware/reducers";
import { TypeKeys } from "../../middleware/actions";

describe("reducer", () => {
    const initialState: RootState = {
        errorMessage: "someErrorMessage",
        currentUserPosition: "someCurrentUserPosition",
        currentUserLastName: "someCurrentUserLastName",
        currentUserId: "someCurrentUserId",
        currentUserFirstName: "someCurrentUserFirstName",
        currentUserToken: "someCurrentUserToken",
        users: ["user1", "user2"],
        isErrorMessageOpened: false,
        isSignUpFormOpened: false,
        currentUserEmail: "someuseremail@gmail.com",
        isSignInFormOpened: false
    };

    it("OTHER_ACTION leaves the state unchanged", () => {
        const state = reducer(initialState, {type: TypeKeys.OTHER_ACTION});
        expect(state).toEqual(initialState);
    });

    it("GET_USERS_SUCCESS_ACTION fills in users", () => {
        const expectedUsers = ["someOtherUser1"];
        const state = reducer(initialState, {type: TypeKeys.GET_USERS_SUCCESS_ACTION, users: expectedUsers});
        expect(state).toEqual({...initialState, users: expectedUsers});
    });

    it("OPEN_SIGNIN_FORM_ACTION fills in users", () => {
        const expectedUsers = ["someOtherUser1"];
        const state = reducer(initialState, {type: TypeKeys.GET_USERS_SUCCESS_ACTION, users: expectedUsers});
        expect(state).toEqual({...initialState, users: expectedUsers});
    });

    it("OPEN_SIGNIN_FORM_ACTION opens sign-in form", () => {
        const state = reducer(initialState, {type: TypeKeys.OPEN_SIGNIN_FORM_ACTION});
        expect(state).toEqual({...initialState, isSignInFormOpened: true, isSignUpFormOpened: false});
    });

    it("OPEN_SIGNUP_FORM_ACTION opens sign-up form", () => {
        const state = reducer(initialState, {type: TypeKeys.OPEN_SIGNUP_FORM_ACTION});
        expect(state).toEqual({...initialState, isSignInFormOpened: false, isSignUpFormOpened: true});
    });

    it("CLOSE_SIGNIN_FORM_ACTION  closes all windows", () => {
        const state = reducer(initialState, {type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION});
        expect(state).toEqual({...initialState, isSignInFormOpened: false, isSignUpFormOpened: false});
    });

    it("CLOSE_SIGNUP_FORM_ACTION closes all windows", () => {
        const state = reducer(initialState, {type: TypeKeys.CLOSE_SIGNUP_FORM_ACTION});
        expect(state).toEqual({...initialState, isSignInFormOpened: false, isSignUpFormOpened: false});
    });

    it("LOGOUT_SUCCESS_ACTION makes all current** fields and token null", () => {
        const state = reducer(initialState, {type: TypeKeys.LOGOUT_SUCCESS_ACTION});
        expect(state).toEqual({...initialState,
            currentUserId: null,
            currentUserEmail: null,
            currentUserFirstName:null,
            currentUserLastName: null,
            currentUserPosition: null,
            currentUserToken: null});
    });

    it("LOGIN_SUCCESS_ACTION fills in all current** fields and token", () => {
        const expectedUserId = "userId";
        const expectedToken = "token";
        const expectedUserFirstName = "userFirstName";
        const expectedUserLastName = "userLastName";
        const expectedUserPosition = "userPosition";
        const expectedUserEmail = "UserEmail";
        const state = reducer(initialState, {
            type: TypeKeys.LOGIN_SUCCESS_ACTION,
            userId: expectedUserId,
            token: expectedToken,
            userFirstName: expectedUserFirstName,
            userLastName: expectedUserLastName,
            userPosition: expectedUserPosition,
            userEmail: expectedUserEmail
        });
        expect(state).toEqual({
            ...initialState,
            currentUserId: expectedUserId,
            currentUserEmail: expectedUserEmail,
            currentUserFirstName: expectedUserFirstName,
            currentUserLastName: expectedUserLastName,
            currentUserPosition: expectedUserPosition,
            currentUserToken: expectedToken
        });
    });

    it("OPEN_ERROR_MESSAGE_ACTION opens error message window and updates its message", () => {
        const expectedErrorMessage = "someErrorMessage";
        const state = reducer(initialState, {type: TypeKeys.OPEN_ERROR_MESSAGE_ACTION, errorMessage: expectedErrorMessage});
        expect(state).toEqual({...initialState, isErrorMessageOpened: true, errorMessage: expectedErrorMessage});
    });

    it("CLOSE_ERROR_MESSAGE_ACTION closes error message", ()=>{
        const state = reducer(initialState, {type: TypeKeys.CLOSE_ERROR_MESSAGE_ACTION});
        expect(state).toEqual({...initialState, isErrorMessageOpened: false});
    });
});