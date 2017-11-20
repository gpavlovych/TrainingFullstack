export enum TypeKeys {
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
    OTHER_ACTION = "OTHER_ACTION"
}

export interface LoginRequestAction{
    type: TypeKeys.LOGIN_REQUEST_ACTION;
    email: string;
    password: string;
    history: any;
}

export interface LogoutSuccessAction {
    type: TypeKeys.LOGOUT_SUCCESS_ACTION;
}

export interface LogoutRequestAction {
    type: TypeKeys.LOGOUT_REQUEST_ACTION;
    history: any;
}

export interface RegisterRequestAction {
    type: TypeKeys.REGISTER_REQUEST_ACTION;
    username: string;
    email: string;
    password: string;
    history: any;
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
    username: string;
    token: string;
}

export interface RegisterSuccessAction {
    type: TypeKeys.REGISTER_SUCCESS_ACTION;
    username: string;
    email: string;
    password: string;
}

export interface OtherAction {
    type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes = LoginRequestAction |
    LogoutRequestAction |
    LogoutSuccessAction |
    RegisterRequestAction |
    CloseSignInFormAction |
    CloseSignUpFormAction |
    OpenSignUpFormAction |
    OpenSignInFormAction |
    LoginSuccessAction |
    RegisterSuccessAction |
    OtherAction;