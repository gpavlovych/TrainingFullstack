export enum TypeKeys {
    GET_USERS_REQUEST_ACTION = "GET_USERS_REQUEST_ACTION",
    GET_USERS_SUCCESS_ACTION = "GET_USERS_SUCCESS_ACTION",
    LOGIN_REQUEST_ACTION = "LOGIN_REQUEST_ACTION",
    LOGOUT_SUCCESS_ACTION = "LOGOUT_SUCCESS_ACTION",
    LOGOUT_REQUEST_ACTION = "LOGOUT_REQUEST_ACTION",
    REGISTER_REQUEST_ACTION = "REGISTER_REQUEST_ACTION",
    CLOSE_SIGNUP_FORM_ACTION = "CLOSE_SIGNUP_FORM_ACTION",
    CLOSE_SIGNIN_FORM_ACTION = "CLOSE_SIGNIN_FORM_ACTION",
    OPEN_SIGNIN_FORM_ACTION = "OPEN_SIGNIN_FORM_ACTION",
    OPEN_SIGNUP_FORM_ACTION = "OPEN_SIGNUP_FORM_ACTION",
    LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION",
    REGISTER_SUCCESS_ACTION = "REGISTER_SUCCESS_ACTION",
    OPEN_ERROR_MESSAGE_ACTION = "OPEN_ERROR_MESSAGE_ACTION",
    CLOSE_ERROR_MESSAGE_ACTION = "CLOSE_ERROR_MESSAGE_ACTION",
    OTHER_ACTION = "OTHER_ACTION"
}

export interface GetUsersRequestAction {
    type: TypeKeys.GET_USERS_REQUEST_ACTION;
    token: string;
}

export interface GetUsersSuccessAction {
    type: TypeKeys.GET_USERS_SUCCESS_ACTION;
    users: any[];
}

export interface LoginRequestAction{
    type: TypeKeys.LOGIN_REQUEST_ACTION;
    email: string;
    password: string;
    callback: ()=>{};
}

export interface LogoutSuccessAction {
    type: TypeKeys.LOGOUT_SUCCESS_ACTION;
}

export interface LogoutRequestAction {
    type: TypeKeys.LOGOUT_REQUEST_ACTION;
    callback: ()=>{};
}

export interface RegisterRequestAction {
    type: TypeKeys.REGISTER_REQUEST_ACTION;
    userPhoto: any;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
    callback: ()=>{};
}

export interface CloseSignInFormAction {
    type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION;
}

export interface CloseSignUpFormAction {
    type: TypeKeys.CLOSE_SIGNUP_FORM_ACTION;
}

export interface OpenSignUpFormAction {
    type: TypeKeys.OPEN_SIGNUP_FORM_ACTION;
}

export interface OpenSignInFormAction {
    type: TypeKeys.OPEN_SIGNIN_FORM_ACTION;
}

export interface LoginSuccessAction {
    type: TypeKeys.LOGIN_SUCCESS_ACTION;
    currentUserId: string;
    token: string;
}

export interface OpenErrorMessageAction {
    type: TypeKeys.OPEN_ERROR_MESSAGE_ACTION;
    errorMessage: string;
}

export interface CloseErrorMessageAction {
    type: TypeKeys.CLOSE_ERROR_MESSAGE_ACTION;
}

export interface RegisterSuccessAction {
    type: TypeKeys.REGISTER_SUCCESS_ACTION;
}

export interface OtherAction {
    type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes =
    GetUsersRequestAction |
    GetUsersSuccessAction |
    LoginRequestAction |
    LogoutRequestAction |
    LogoutSuccessAction |
    RegisterRequestAction |
    CloseSignInFormAction |
    CloseSignUpFormAction |
    OpenSignUpFormAction |
    OpenSignInFormAction |
    LoginSuccessAction |
    RegisterSuccessAction |
    OpenErrorMessageAction |
    CloseErrorMessageAction |
    OtherAction;