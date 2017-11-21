import {ActionTypes, TypeKeys} from "./actions";

export interface State{
    isSignInFormOpened: boolean;
    isSignUpFormOpened: boolean;
    isErrorMessageOpened: boolean;
    currentUserId: any;
    errorMessage?: string|null;
    firstName?: string|null;
    lastName?: string|null;
    position?: string|null;
    userPhoto?: Blob|null;
    password?: string|null;
    email?: string|null;
    token?: string|null;
    users?: any[]|null;
}

export const initialState = {
    isSignInFormOpened:false,
    isSignUpFormOpened:false,
    isErrorMessageOpened:false,
    currentUserId:null
};

export default function reducer(state: State = initialState, action: ActionTypes): State {
    console.log(action);
    switch (action.type) {
        case TypeKeys.GET_USERS_REQUEST_ACTION:
            return {...state, users: null};

        case TypeKeys.GET_USERS_SUCCESS_ACTION:
            return {...state, users: action.users};

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
            return {...state, email: null, password: null, currentUserId: action.currentUserId, token: action.token};

        case TypeKeys.REGISTER_REQUEST_ACTION:
            return {...state, email: action.email, firstName: action.firstName, lastName: action.lastName, position: action.position, password: action.password};

        case TypeKeys.REGISTER_SUCCESS_ACTION:
            return {...state, email: null, firstName: null, lastName: null, position: null, password: null};

        case TypeKeys.OPEN_ERROR_MESSAGE_ACTION:
            return {...state, isErrorMessageOpened: true, errorMessage: action.errorMessage};

        case TypeKeys.CLOSE_ERROR_MESSAGE_ACTION:
            return {...state, isErrorMessageOpened: false};

        default:
            return state;
    }
}