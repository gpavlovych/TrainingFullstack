import * as Redux from 'redux';
import {LoginTab} from "./Login";
import {CANCEL_SIGN_IN, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_SIGN_IN, OPEN_SIGN_UP} from "./actions";

export interface IRegistrationState {
    isOpened: boolean,
    tab: LoginTab,
    isLoggedIn: boolean,
}

// The initial application state
let initialState: IRegistrationState =  {
    isOpened: false,
    tab: LoginTab.SignIn,
    isLoggedIn: false
};

export default function reducer(state: IRegistrationState = initialState, action: Redux.Action): IRegistrationState {
    console.log("reducer "+JSON.stringify(action));
    switch (action.type) {
        case OPEN_SIGN_IN:
            return Object.assign({}, state, {
                tab: LoginTab.SignIn,
                isOpened: true
            });
        case OPEN_SIGN_UP:
            return Object.assign({}, state, {
                tab: LoginTab.SignUp,
                isOpened: true
            });
        case CANCEL_SIGN_IN:
            return Object.assign({}, state, {
                isOpened: false
            });
        case LOGIN_SUCCESS: console.log("login "+JSON.stringify(action));
            return Object.assign({}, state, { isOpened: false,
                isLoggedIn: true
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { isOpened: false,
                isLoggedIn: false
            });
        default:
            return state;
    }
}