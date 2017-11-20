import {ActionTypes, TypeKeys} from "./actions";

export interface State{
    isSignInFormOpened: boolean;
    isSignUpFormOpened: boolean;
    username?: string|null;
    password?: string|null;
    email?: string|null;
    token?: string|null;
}

export const initialState = {
    isSignInFormOpened:false,
    isSignUpFormOpened:false
};

export default function reducer(state: State = initialState, action: ActionTypes): State {
    switch (action.type) {
        case TypeKeys.OPEN_SIGNIN_FORM_ACTION:
            return { ...state, isSignInFormOpened: true, isSignUpFormOpened: false };

        case TypeKeys.OPEN_SIGNUP_FORM_ACTION:
            return { ...state, isSignUpFormOpened: true, isSignInFormOpened: false };

        case TypeKeys.CLOSE_SIGNIN_FORM_ACTION:
            return { ...state, isSignInFormOpened: false, isSignUpFormOpened: false };

        case TypeKeys.CLOSE_SIGNUP_FORM_ACTION:
            return { ...state, isSignUpFormOpened: false, isSignInFormOpened: false };

        case TypeKeys.LOGOUT_SUCCESS_ACTION:
            return {...state, token: null};

        case TypeKeys.LOGIN_REQUEST_ACTION:
            return {...state, email: action.email, password: action.password};

        case TypeKeys.LOGIN_SUCCESS_ACTION:
            return {...state, email: null, password: null, username: action.username, token: action.token};

        case TypeKeys.REGISTER_REQUEST_ACTION:
            return {...state, email: action.email, username: action.username, password: action.password};

        case TypeKeys.REGISTER_SUCCESS_ACTION:
            return {...state, email: action.email, username: action.username, password: action.password};

        default:
            return state;
    }
}