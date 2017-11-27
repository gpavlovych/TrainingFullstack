import { ActionTypes, TypeKeys } from './actions';

export interface RootState {
    isSignInFormOpened: boolean;
    isSignUpFormOpened: boolean;
    isErrorMessageOpened: boolean;
    currentUserId: string|null;
    currentUserEmail: string|null;
    currentUserFirstName: string|null;
    currentUserLastName: string|null;
    currentUserPosition: string|null;
    currentUserToken: string|null;
    errorMessage?: string|null;
    // tslint:disable-next-line
    users?: any[]|null;
}

export const initialState = {
    isSignInFormOpened: false,
    isSignUpFormOpened: false,
    isErrorMessageOpened: false,
    currentUserId: null,
    currentUserEmail: null,
    currentUserFirstName: null,
    currentUserLastName: null,
    currentUserPosition: null,
    currentUserToken: null,
};

export default function reducer(state: RootState = initialState, action: ActionTypes): RootState {
    switch (action.type) {
        case TypeKeys.GET_USERS_SUCCESS_ACTION:
            return {...state, users: action.users};

        case TypeKeys.OPEN_SIGNIN_FORM_ACTION:
            return { ...state, isSignInFormOpened: true, isSignUpFormOpened: false };

        case TypeKeys.OPEN_SIGNUP_FORM_ACTION:
            return { ...state, isSignInFormOpened: false, isSignUpFormOpened: true };

        case TypeKeys.CLOSE_SIGNIN_FORM_ACTION:
            return { ...state, isSignInFormOpened: false, isSignUpFormOpened: false };

        case TypeKeys.CLOSE_SIGNUP_FORM_ACTION:
            return { ...state, isSignInFormOpened: false, isSignUpFormOpened: false };

        case TypeKeys.LOGOUT_SUCCESS_ACTION:
            return {...state,
                currentUserId: null,
                currentUserEmail: null,
                currentUserFirstName: null,
                currentUserLastName: null,
                currentUserPosition: null,
                currentUserToken: null};

        case TypeKeys.LOGIN_SUCCESS_ACTION:
            return {
                ...state,
                currentUserId: action.userId,
                currentUserEmail: action.userEmail,
                currentUserFirstName: action.userFirstName,
                currentUserLastName: action.userLastName,
                currentUserPosition: action.userPosition,
                currentUserToken: action.token
            };

        case TypeKeys.OPEN_ERROR_MESSAGE_ACTION:
            return {...state, isErrorMessageOpened: true, errorMessage: action.errorMessage};

        case TypeKeys.CLOSE_ERROR_MESSAGE_ACTION:
            return {...state, isErrorMessageOpened: false};

        default:
            return state;
    }
}