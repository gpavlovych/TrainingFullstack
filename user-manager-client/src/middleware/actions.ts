export enum TypeKeys {
    GET_USERS_REQUEST_ACTION = 'GET_USERS_REQUEST_ACTION',
    GET_USERS_SUCCESS_ACTION = 'GET_USERS_SUCCESS_ACTION',
    LOGIN_REQUEST_ACTION = 'LOGIN_REQUEST_ACTION',
    LOGOUT_SUCCESS_ACTION = 'LOGOUT_SUCCESS_ACTION',
    LOGOUT_REQUEST_ACTION = 'LOGOUT_REQUEST_ACTION',
    REGISTER_REQUEST_ACTION = 'REGISTER_REQUEST_ACTION',
    CLOSE_SIGNUP_FORM_ACTION = 'CLOSE_SIGNUP_FORM_ACTION',
    CLOSE_SIGNIN_FORM_ACTION = 'CLOSE_SIGNIN_FORM_ACTION',
    OPEN_SIGNIN_FORM_ACTION = 'OPEN_SIGNIN_FORM_ACTION',
    OPEN_SIGNUP_FORM_ACTION = 'OPEN_SIGNUP_FORM_ACTION',
    LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION',
    REGISTER_SUCCESS_ACTION = 'REGISTER_SUCCESS_ACTION',
    OPEN_ERROR_MESSAGE_ACTION = 'OPEN_ERROR_MESSAGE_ACTION',
    CLOSE_ERROR_MESSAGE_ACTION = 'CLOSE_ERROR_MESSAGE_ACTION',
    OTHER_ACTION = 'OTHER_ACTION'
}

export interface GetUsersRequestAction {
    type: TypeKeys.GET_USERS_REQUEST_ACTION;
    token: string;
}

export const createGetUserRequestAction = (token: string): GetUsersRequestAction => {
    return {type: TypeKeys.GET_USERS_REQUEST_ACTION, token};
};

export interface GetUsersSuccessAction {
    type: TypeKeys.GET_USERS_SUCCESS_ACTION;
    // tslint:disable-next-line
    users: any[];
}

// tslint:disable-next-line
export const createGetUsersSuccessAction = (users: any[]): GetUsersSuccessAction => {
  return {type: TypeKeys.GET_USERS_SUCCESS_ACTION, users};
};

export interface LoginRequestAction {
    type: TypeKeys.LOGIN_REQUEST_ACTION;
    email: string;
    password: string;
    callback: () => void;
}

export const createLoginRequestAction = (email: string, password: string, callback: () => void): LoginRequestAction => {
    return {type: TypeKeys.LOGIN_REQUEST_ACTION, email, password, callback};
};

export interface LoginSuccessAction {
    type: TypeKeys.LOGIN_SUCCESS_ACTION;
    userId: string;
    token: string;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    userPosition: string;
}

export const createLoginSuccessAction = (
        userId: string,
        userFirstName: string, 
        userLastName: string,
        userPosition: string,
        token: string,
        userEmail: string
    ): LoginSuccessAction => {
    return {type: TypeKeys.LOGIN_SUCCESS_ACTION, userId, userFirstName,  userLastName, userPosition, token, userEmail};
};

export interface LogoutRequestAction {
    type: TypeKeys.LOGOUT_REQUEST_ACTION;
    callback: () => void;
}

export const createLogoutRequestAction = (callback: () => void): LogoutRequestAction => {
    return {type: TypeKeys.LOGOUT_REQUEST_ACTION, callback};
};

export interface LogoutSuccessAction {
    type: TypeKeys.LOGOUT_SUCCESS_ACTION;
}

export const createLogoutSuccessAction = (): LogoutSuccessAction => {
    return {type: TypeKeys.LOGOUT_SUCCESS_ACTION};
};

export interface RegisterRequestAction {
    type: TypeKeys.REGISTER_REQUEST_ACTION;
    userPhoto: Blob|null;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
    callback: () => void;
}

export const createRegisterRequestAction = (
        userPhoto: Blob|null,
        firstName: string,
        lastName: string,
        position: string,
        email: string,
        password: string,
        callback: () => void
    ): RegisterRequestAction => {

    return {
        type: TypeKeys.REGISTER_REQUEST_ACTION,
        userPhoto,
        firstName,
        lastName,
        position,
        email,
        password,
        callback
    };
};

export interface RegisterSuccessAction {
    type: TypeKeys.REGISTER_SUCCESS_ACTION;
}

export const createRegisterSuccessAction = (): RegisterSuccessAction => {
    return {type: TypeKeys.REGISTER_SUCCESS_ACTION};
};

export interface CloseSignInFormAction {
    type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION;
}

export const createCloseSignInFormAction = (): CloseSignInFormAction => {
    return {type: TypeKeys.CLOSE_SIGNIN_FORM_ACTION};
};

export interface CloseSignUpFormAction {
    type: TypeKeys.CLOSE_SIGNUP_FORM_ACTION;
}

export const createCloseSignUpFormAction = (): CloseSignUpFormAction => {
    return {type: TypeKeys.CLOSE_SIGNUP_FORM_ACTION};
};

export interface OpenSignUpFormAction {
    type: TypeKeys.OPEN_SIGNUP_FORM_ACTION;
}

export const createOpenSignUpFormAction = (): OpenSignUpFormAction => {
    return {type: TypeKeys.OPEN_SIGNUP_FORM_ACTION};
};

export interface OpenSignInFormAction {
    type: TypeKeys.OPEN_SIGNIN_FORM_ACTION;
}

export const createOpenSignInFormAction = (): OpenSignInFormAction => {
    return {type: TypeKeys.OPEN_SIGNIN_FORM_ACTION};
};

export interface OpenErrorMessageAction {
    type: TypeKeys.OPEN_ERROR_MESSAGE_ACTION;
    errorMessage: string;
}

export const createOpenErrorMessageAction = (errorMessage: string): OpenErrorMessageAction => {
    return {type: TypeKeys.OPEN_ERROR_MESSAGE_ACTION, errorMessage};
};

export interface CloseErrorMessageAction {
    type: TypeKeys.CLOSE_ERROR_MESSAGE_ACTION;
}

export const createCloseErrorMessageAction = (): CloseErrorMessageAction => {
    return {type: TypeKeys.CLOSE_ERROR_MESSAGE_ACTION};
};

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