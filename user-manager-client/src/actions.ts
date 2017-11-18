export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const SET_AUTH = "SET_AUTH";
export const CHANGE_FORM = "CHANGE_FORM";
export const LOGOUT = "LOGOUT";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const CANCEL_SIGN_IN = "CANCEL_SIGN_IN";
export const OPEN_SIGN_UP = "OPEN_SIGN_UP";
export const OPEN_SIGN_IN = "OPEN_SIGN_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export function logoutAction(){
    return {type: LOGOUT};
}
export function openSignIn(){
    return {type: OPEN_SIGN_IN};
}

export function openSignUp(){
    return {type: OPEN_SIGN_UP};
}

export function cancelSignIn(){
    return {type: CANCEL_SIGN_IN};
}

export function loginRequest(login: string, password: string) {
    return {type: LOGIN_REQUEST, data: {username: login, password:password}};
}

export function registerRequest(login: string, password: string){
    return {type: REGISTER_REQUEST, data: {username: login, password:password}};
}